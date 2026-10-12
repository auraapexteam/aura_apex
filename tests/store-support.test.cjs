const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

function loadSource(relativePath, mocks = {}) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    module, exports: module.exports,
    require(name) {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name === 'react' || name === 'react/jsx-runtime') return require(name);
      throw new Error(`Unexpected dependency: ${name}`);
    },
  }, { filename });
  return module.exports;
}

const support = loadSource('src/support.ts');
const { resolvePage } = loadSource('src/routing.ts');
const icon = () => null;
const { StoreSupportPage } = loadSource('src/components/StoreSupportPage.tsx', {
  '../support': support,
  'lucide-react': { ArrowLeft: icon, LifeBuoy: icon, Mail: icon, Trash2: icon },
});
const renderPage = (page) => renderToStaticMarkup(React.createElement(StoreSupportPage, { page }));

test('external resource resolves on direct visits and trailing slashes', () => {
  assert.equal(resolvePage('/delete-account', '#download'), 'delete-account');
  assert.equal(resolvePage('/delete-account/'), 'delete-account');
  assert.equal(resolvePage('/support/'), 'support');
});

test('existing home anchors and download route remain distinct', () => {
  assert.equal(resolvePage('/', '#contact'), 'home');
  assert.equal(resolvePage('/', '#download'), 'download');
  assert.equal(resolvePage('/support', '#download'), 'support');
  assert.equal(resolvePage('/unknown'), 'not-found');
});

test('email request encodes punctuation and multiline bodies into the intended mailto fields', () => {
  const subject = 'Privacy & records? #test';
  const body = 'My account email is person+test@example.invalid.\nNext & line?';
  const mailto = new URL(support.supportMailto(subject, body));
  assert.equal(mailto.protocol, 'mailto:');
  assert.equal(mailto.pathname, 'contact@auraapex.in');
  assert.equal(mailto.searchParams.get('subject'), subject);
  assert.equal(mailto.searchParams.get('body'), body);
  assert.deepEqual([...mailto.searchParams.keys()], ['subject', 'body']);
});

test('deletion request has actionable address, account identity and ownership check', () => {
  const mailto = new URL(support.DELETION_MAILTO);
  assert.equal(mailto.pathname, 'contact@auraapex.in');
  assert.equal(mailto.searchParams.get('subject'), 'Aura Apex account deletion request');
  assert.match(mailto.searchParams.get('body'), /Registered account email or phone/);
  assert.match(mailto.searchParams.get('body'), /verify account ownership securely/i);
  const html = renderPage('delete-account');
  assert.match(html, /href="mailto:contact@auraapex.in\?subject=/);
  assert.match(html, /without reinstalling or signing into the app/);
  assert.doesNotMatch(html, /<form|<input|action=|type="password"/);
});

test('support resource links to external deletion and has manual-email fallback', () => {
  const html = renderPage('support');
  assert.match(html, /href="\/delete-account"/);
  assert.match(html, /copy the address and email us through your email service/);
  assert.match(html, /contact@auraapex.in/);
});

test('not-found resource offers functioning navigation rather than rendering home content', () => {
  const html = renderPage('not-found');
  assert.match(html, /Page not found/);
  assert.match(html, /href="\/support"/);
  assert.match(html, /href="\/"/);
});
