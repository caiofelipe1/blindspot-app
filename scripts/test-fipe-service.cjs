const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const filename = path.resolve(__dirname, '../src/services/fipeService.ts');
const compiled = new Module(filename, module);
compiled.filename = filename;
compiled.paths = module.paths;
const calls = [];
let fail = false;
compiled.require = name => {
  assert.equal(name, 'axios');
  return { create: () => ({ get: async url => {
    calls.push(url);
    if (fail) throw { isAxiosError: true, response: { status: 503 } };
    if (url.endsWith('/models')) return { data: [{ code: '8554', name: 'Hilux GR-S' }] };
    if (url.endsWith('/years')) return { data: [{ code: '2024-3', name: '2024 Diesel' }] };
    return { data: [] };
  } }) };
};
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { fipeService: api, fipeErrorMessage } = compiled.exports;

async function main() {
  await Promise.all([api.getBrands(), api.getBrands()]);
  await api.getBrands();
  assert.equal(calls.length, 1, 'Concurrent and repeated discovery calls must share a request');
  assert.deepEqual(await api.getBrandYears('56'), [{ codigo: '2024-3', nome: '2024 Diesel' }]);
  assert.deepEqual(await api.getModelsForYear('56', '2024-3'), [{ codigo: 8554, nome: 'Hilux GR-S' }]);
  const before = calls.length;
  await api.getPrice('56', 8554, '2024-3');
  await api.getPrice('56', 8554, '2024-3');
  assert.equal(calls.length, before + 2, 'Manual price refresh must always contact the API');
  fail = true;
  await assert.rejects(api.getBrandYears('25'));
  fail = false;
  assert.equal((await api.getBrandYears('25')).length, 1, 'Failed discovery must be retryable');
  const beforeExpiry = calls.length;
  const realNow = Date.now;
  Date.now = () => realNow() + 31 * 60 * 1000;
  try { await api.getBrands(); } finally { Date.now = realNow; }
  assert.equal(calls.length, beforeExpiry + 1, 'Expired discovery must be fetched again');
  assert.match(fipeErrorMessage({ isAxiosError: true, response: { status: 429 } }), /limite/);
  assert.match(fipeErrorMessage({ isAxiosError: true, response: { status: 503 } }), /temporariamente/);
  assert.match(fipeErrorMessage({ isAxiosError: true, code: 'ECONNABORTED' }), /demorou/);
  assert.match(fipeErrorMessage({ isAxiosError: true, code: 'ERR_NETWORK' }), /conexão/);
  assert.equal(fipeErrorMessage(new Error('Falha ao salvar')), 'Falha ao salvar');
  console.log('FIPE service checks passed: cache, concurrent requests, expiry, retries, fresh prices and error messages.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
