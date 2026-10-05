const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
function loadSource(file, imports = {}, env = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(output, {
    module, exports: module.exports, process: { env }, console: { warn() {}, error() {} }, Date, Intl, Map, String,
    require(name) { if (Object.hasOwn(imports, name)) return imports[name]; throw new Error(`Unexpected dependency: ${name}`); },
  }, { filename: file });
  return module.exports;
}

const schedule = loadSource('shared/demo-schedule.ts');
const routing = loadSource('src/routing.ts');
const support = loadSource('src/support.ts');
function response() {
  return { code: 200, payload: null, setHeader() {}, status(code) { this.code = code; return this; }, json(payload) { this.payload = payload; return this; }, end() { return this; } };
}
function request(body = {}, ip = 'test') {
  return { method: 'POST', body, headers: { 'x-forwarded-for': ip }, socket: {} };
}
function bookingPayload() {
  return { date: schedule.getDemoDates()[0].value, timeSlot: '09:00 AM IST', fullName: 'Website Test', email: 'test@example.invalid', companyName: 'Test gym', teamSize: '1-10' };
}
function bookingHandler({ env = {}, configured = false, query = async () => [], email = async () => ({ success: true }) } = {}) {
  return loadSource('api/book-demo.ts', {
    './_db.js': { executeQuery: query }, './_email.js': { isEmailConfigured: () => configured, sendDemoEmails: email },
    '../shared/demo-schedule.js': schedule, crypto: require('node:crypto'),
  }, env).default;
}

test('public paths, trailing slashes and home hash navigation resolve independently', () => {
  const paths = { '/privacy-policy': 'privacy', '/terms-of-service': 'terms', '/support': 'support', '/delete-account': 'delete-account' };
  for (const [pathname, page] of Object.entries(paths)) {
    assert.equal(routing.resolvePage(pathname), page);
    assert.equal(routing.resolvePage(pathname + '/'), page);
    assert.equal(routing.resolvePage(pathname, '#download'), page);
  }
  assert.equal(routing.resolvePage('/', '#download'), 'download');
  assert.equal(routing.resolvePage('/', '#about'), 'home');
  assert.equal(routing.resolvePage('/missing'), 'not-found');
});

test('demo window uses India calendar dates, skips weekends and crosses a year boundary', () => {
  assert.deepEqual(Array.from(schedule.getDemoDates(new Date('2026-10-02T19:30:00Z')), d => d.value), ['2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08', '2026-10-09', '2026-10-12']);
  const rollover = schedule.getDemoDates(new Date('2026-12-31T10:00:00Z'));
  assert.equal(rollover.length, 6);
  assert.equal(rollover[0].value, '2027-01-01');
  assert.equal(rollover[0].day, 'Fri');
  assert.equal(schedule.isOfferedDemoDate('2026-10-03', new Date('2026-10-03T10:00:00Z')), false);
  assert.equal(schedule.isOfferedDemoDate('2026-10-04', new Date('2026-10-03T10:00:00Z')), false);
  assert.equal(schedule.isOfferedDemoDate('2030-01-01', new Date('2026-10-03T10:00:00Z')), false);
});

test('support deletion action encodes the address, subject and ownership-verification request', () => {
  const url = new URL(support.DELETION_MAILTO);
  assert.equal(url.pathname, 'contact@auraapex.in');
  assert.equal(url.searchParams.get('subject'), 'Aura Apex account deletion request');
  assert.match(url.searchParams.get('body'), /verify that I own this account/);
  assert.match(url.searchParams.get('body'), /passwords or one-time codes/);
  assert.equal(url.hash, '');
});

test('past date and unlisted time are rejected before database or email calls', async () => {
  const fail = async () => { throw new Error('External operation must not run'); };
  for (const body of [{ ...bookingPayload(), date: '2026-08-25' }, { ...bookingPayload(), timeSlot: 'midnight' }]) {
    const res = response();
    await bookingHandler({ env: { DATABASE_URL: 'unused-test-value' }, configured: true, query: fail, email: fail })(request(body), res);
    assert.equal(res.code, 400);
    assert.equal(res.payload.success, false);
  }
});

test('missing booking configuration returns unavailable without storage or email', async () => {
  let calls = 0;
  const external = async () => { calls++; return []; };
  for (const config of [{ env: {}, configured: true }, { env: { DATABASE_URL: 'unused-test-value' }, configured: false }]) {
    const res = response();
    await bookingHandler({ ...config, query: external, email: external })(request(bookingPayload()), res);
    assert.equal(res.code, 503);
    assert.equal(res.payload.success, false);
  }
  assert.equal(calls, 0);
});

test('saved booking with failed notification reports partial outcome and a real reference', async () => {
  let queries = 0;
  const res = response();
  await bookingHandler({ env: { DATABASE_URL: 'unused-test-value' }, configured: true, query: async () => { queries++; return []; }, email: async () => ({ success: false }) })(request(bookingPayload()), res);
  assert.equal(queries, 2);
  assert.equal(res.code, 502);
  assert.equal(res.payload.success, false);
  assert.equal(res.payload.bookingSaved, true);
  assert.equal(res.payload.notificationSent, false);
  assert.match(res.payload.bookingId, /^APEX-\d{4}-[A-F0-9]{12}$/);
});

test('stored booking and accepted emails return confirmed outcomes; occupied slots do not send', async () => {
  let sends = 0;
  const email = async () => { sends++; return { success: true }; };
  const ok = response();
  await bookingHandler({ env: { DATABASE_URL: 'unused-test-value' }, configured: true, email })(request(bookingPayload()), ok);
  assert.equal(ok.code, 200);
  assert.equal(ok.payload.bookingSaved, true);
  assert.equal(ok.payload.notificationSent, true);
  const occupied = response();
  await bookingHandler({ env: { DATABASE_URL: 'unused-test-value' }, configured: true, query: async () => [{ id: 'occupied' }], email })(request(bookingPayload()), occupied);
  assert.equal(occupied.code, 409);
  assert.equal(sends, 1);
});

test('missing email service cannot simulate contact or demo delivery', async () => {
  const service = loadSource('api/_email.ts', { resend: { Resend: class {} } });
  assert.equal(service.isEmailConfigured(), false);
  assert.equal((await service.sendContactEmail({ fullName: 'Test', email: 'test@example.invalid', message: 'Test' })).success, false);
  assert.equal((await service.sendDemoEmails({})).success, false);
  const handler = loadSource('api/contact.ts', { './_email.js': service }).default;
  const res = response();
  await handler(request({ fullName: 'Test', email: 'test@example.invalid', message: 'Test' }), res);
  assert.equal(res.code, 503);
  assert.equal(res.payload.success, false);
});

test('email provider rejection is propagated rather than announced as delivery', async () => {
  const service = loadSource('api/_email.ts', { resend: { Resend: class { emails = { send: async () => ({ error: { message: 'Test rejection' } }) }; } } }, { RESEND_API_KEY: 'test-only-value', SENDER_EMAIL: 'test@example.invalid' });
  assert.equal((await service.sendContactEmail({ fullName: 'Test', email: 'test@example.invalid', message: 'Test' })).success, false);
  assert.equal((await service.sendDemoEmails({ fullName: 'Test', email: 'test@example.invalid', bookingId: 'Test' })).success, false);
});
