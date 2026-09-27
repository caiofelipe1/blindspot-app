const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
let saved = null;
let failRead = false;
const storage = {
  getItem: async () => { if (failRead) throw new Error('read failed'); return saved; },
  setItem: async (_, value) => { saved = value; },
  removeItem: async () => { saved = null; },
};
async function openStore() {
  const filename = path.resolve(__dirname, '../src/stores/authStore.ts');
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = module.paths;
  const original = compiled.require.bind(compiled);
  compiled.require = name => name === '@react-native-async-storage/async-storage' ? { default: storage } : original(name);
  compiled._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  const store = compiled.exports.useAuthStore;
  store.hydrationStatus = compiled.exports.useAuthHydration;
  await store.persist.rehydrate();
  return store;
}
async function main() {
  let store = await openStore();
  assert.equal(store.hydrationStatus.getState().ready, true);
  assert.equal(store.getState().completeRegistration().success, false);
  store.getState().setPendingRegistration({ name: '', email: 'invalid', password: 'x' });
  assert.equal(store.getState().completeRegistration().success, false);
  store.getState().setPendingRegistration({ name: 'Teste', email: 'local@example.test', password: 'test-only-123' });
  assert.equal(store.getState().completeRegistration(false).success, true);
  assert.equal(store.getState().isLoggedIn, true);
  assert.equal(JSON.parse(saved).state.user, null);
  assert.equal(JSON.parse(saved).state.pendingRegistration, undefined);
  store = await openStore();
  assert.equal(store.getState().isLoggedIn, false);
  assert.equal((await store.getState().login('local@example.test', 'wrong')).success, false);
  assert.equal((await store.getState().login(' LOCAL@example.test ', 'test-only-123', true)).success, true);
  store = await openStore();
  assert.equal(store.getState().isLoggedIn, true);
  assert.equal(store.getState().user.name, 'Teste');
  store.getState().logout();
  store = await openStore();
  assert.equal(store.getState().isLoggedIn, false);
  store.getState().setPendingRegistration({ name: 'Outro', email: 'LOCAL@example.test', password: 'test-only-456' });
  assert.equal(store.getState().completeRegistration().success, false);
  const credentials = store.getState().credentials;
  saved = JSON.stringify({ version: 0, state: { credentials, isLoggedIn: true, user: { name: 'Legacy' } } });
  store = await openStore();
  assert.equal(store.getState().isLoggedIn, false);
  assert.equal(store.getState().credentials.length, credentials.length);
  assert.equal((await store.getState().login('local@example.test', 'test-only-123', false)).success, true);
  store = await openStore();
  assert.equal(store.getState().isLoggedIn, false);
  failRead = true;
  store = await openStore();
  assert.equal(store.hydrationStatus.getState().ready, false);
  assert.ok(store.hydrationStatus.getState().error);
  failRead = false;
  await store.persist.rehydrate();
  assert.equal(store.hydrationStatus.getState().ready, true);
  assert.equal(store.hydrationStatus.getState().error, null);
  console.log('Auth checks passed: registration, duplicates, remember on/off, restart, logout, legacy migration and hydration failure/retry.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
