const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function loadSource(relativePath, mocks, env) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    module,
    exports: module.exports,
    require(name) {
      if (!Object.hasOwn(mocks, name)) throw new Error(`Unexpected dependency: ${name}`);
      return mocks[name];
    },
    process: { env: { ...env } },
    console: { warn() {}, error() {} },
  }, { filename });
  return module.exports;
}

function contactStack(env, provider = async () => ({ data: { id: 'test-provider-id' }, error: null })) {
  const sends = [];
  class MockResend {
    emails = {
      send: async (payload) => {
        sends.push(payload);
        return provider(payload);
      },
    };
  }
  const email = loadSource('api/_email.ts', { resend: { Resend: MockResend } }, env);
  const handler = loadSource('api/contact.ts', { './_email.js': email }, env).default;
  async function submit(body = { fullName: 'Contact Test', email: 'OWNER@example.invalid', message: 'Test contact request' }) {
    const result = { statusCode: 200, body: undefined };
    const response = {
      setHeader() {},
      status(code) { result.statusCode = code; return this; },
      json(value) { result.body = value; return this; },
      end() { return this; },
    };
    await handler({ method: 'POST', body, headers: {}, socket: { remoteAddress: 'test-only-client' } }, response);
    return result;
  }
  return { email, sends, submit };
}

const configured = { RESEND_API_KEY: 'test-only-key', SENDER_EMAIL: 'Aura Apex <test-sender@example.invalid>' };

for (const key of [undefined, '', '   ']) {
test(`missing or blank API key fails closed without sending (${JSON.stringify(key)})`, async () => {
  const stack = contactStack({ SENDER_EMAIL: configured.SENDER_EMAIL, ...(key === undefined ? {} : { RESEND_API_KEY: key }) });
  assert.equal(stack.email.isContactEmailConfigured(), false);
  const helper = await stack.email.sendContactEmail({ fullName: 'Test', email: 'test@example.invalid', message: 'Test' });
  assert.equal(helper.success, false);
  assert.equal(helper.id, undefined);
  const result = await stack.submit();
  assert.equal(result.statusCode, 503);
  assert.equal(result.body.success, false);
  assert.match(result.body.message, /contact@auraapex\.in/);
  assert.equal(stack.sends.length, 0);
});
}

for (const sender of [undefined, '', '   ']) {
  test(`missing or blank explicit sender fails closed (${JSON.stringify(sender)})`, async () => {
    const stack = contactStack({ RESEND_API_KEY: configured.RESEND_API_KEY, ...(sender === undefined ? {} : { SENDER_EMAIL: sender }) });
    assert.equal(stack.email.isContactEmailConfigured(), false);
    const result = await stack.submit();
    assert.equal(result.statusCode, 503);
    assert.equal(result.body.success, false);
    assert.equal(stack.sends.length, 0);
  });
}

test('provider rejection returns actionable failure rather than acceptance or raw provider errors', async () => {
  const stack = contactStack(configured, async () => ({ data: null, error: { message: 'Private provider rejection detail' } }));
  const result = await stack.submit();
  assert.equal(result.statusCode, 500);
  assert.equal(result.body.success, false);
  assert.match(result.body.message, /could not be confirmed/);
  assert.match(result.body.message, /contact@auraapex\.in/);
  assert.doesNotMatch(result.body.message, /Private provider/);
  assert.equal(stack.sends.length, 1);
});

test('provider exception returns a consistent actionable failure', async () => {
  const stack = contactStack(configured, async () => { throw new Error('Private exception detail'); });
  const result = await stack.submit();
  assert.equal(result.statusCode, 500);
  assert.equal(result.body.success, false);
  assert.match(result.body.message, /could not be confirmed/);
  assert.match(result.body.message, /contact@auraapex\.in/);
  assert.doesNotMatch(result.body.message, /Private exception/);
});

for (const id of [undefined, '', '   ', 123, false]) {
  test(`provider response without a real message id fails (${JSON.stringify(id)})`, async () => {
    const stack = contactStack(configured, async () => ({ data: { id }, error: null }));
    const result = await stack.submit();
    assert.equal(result.statusCode, 500);
    assert.equal(result.body.success, false);
    assert.match(result.body.message, /contact@auraapex\.in/);
  });
}

test('provider acceptance routes to support with explicit sender and visitor reply-to', async () => {
  const stack = contactStack(configured);
  const result = await stack.submit();
  assert.equal(stack.email.isContactEmailConfigured(), true);
  assert.equal(result.statusCode, 200);
  assert.equal(result.body.success, true);
  assert.match(result.body.message, /accepted by the email provider/);
  assert.doesNotMatch(result.body.message, /received|sent successfully/);
  assert.equal(stack.sends.length, 1);
  const sent = stack.sends[0];
  assert.equal(sent.from, configured.SENDER_EMAIL);
  assert.deepEqual(Array.from(sent.to), ['contact@auraapex.in']);
  assert.equal(sent.replyTo, 'owner@example.invalid');
  assert.match(sent.html, /Contact Test/);
  assert.match(sent.html, /Test contact request/);
});

test('configured recipient override is trimmed and blank override falls back to support', async () => {
  const custom = contactStack({ ...configured, CONTACT_EMAIL: ' support-route@example.invalid ' });
  assert.equal((await custom.submit()).statusCode, 200);
  assert.deepEqual(Array.from(custom.sends[0].to), ['support-route@example.invalid']);
  const blank = contactStack({ ...configured, CONTACT_EMAIL: '   ' });
  assert.equal((await blank.submit()).statusCode, 200);
  assert.deepEqual(Array.from(blank.sends[0].to), ['contact@auraapex.in']);
});

test('invalid message is rejected before a provider send', async () => {
  const stack = contactStack(configured);
  const result = await stack.submit({ fullName: 'Test', email: 'owner@example.invalid', message: 'x'.repeat(501) });
  assert.equal(result.statusCode, 400);
  assert.equal(result.body.success, false);
  assert.equal(stack.sends.length, 0);
});
