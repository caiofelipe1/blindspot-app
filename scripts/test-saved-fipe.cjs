const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
let disk = null;
let failWrite = false;
const storage = {
  getItem: async () => disk,
  setItem: async (_, value) => { if (failWrite) throw new Error('disk full'); disk = value; },
};
function load(relativePath) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = module.paths;
  const original = compiled.require.bind(compiled);
  compiled.require = request => {
    if (request === '@react-native-async-storage/async-storage') return { default: storage };
    if (request.startsWith('.')) return load(path.relative(path.resolve(__dirname, '..'), path.resolve(path.dirname(filename), `${request}.ts`)));
    return original(request);
  };
  compiled._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  return compiled.exports;
}
const { savedFipeFor, fipeCatalogKey } = load('src/utils/savedFipe.ts');
const { selectComparisonAttributes, buildComparisonShare } = load('src/utils/comparison.ts');
const { vehiclePriceSummary } = load('src/utils/vehiclePriceSummary.ts');
const vehicle = { id: '1', brand: 'Ford', model: 'Ranger Raptor', version: '3.0 V6', year: 2025 };
const second = { ...vehicle, id: '2' };
const quote = {
  catalogKey: fipeCatalogKey(vehicle),
  brand: { codigo: '22', nome: 'Ford' }, model: { codigo: 1, nome: 'Ranger Raptor 3.0 V6' }, year: { codigo: '2025-1', nome: '2025 Gasolina' },
  price: { Valor: 'R$ 400.000,00', Marca: 'Ford', Modelo: 'Ranger Raptor 3.0 V6', AnoModelo: 2025, Combustivel: 'Gasolina', SiglaCombustivel: 'G', CodigoFipe: '003001-1', MesReferencia: 'setembro de 2026' },
  consultedAt: '2026-09-27T12:00:00.000Z',
};
async function main() {
  let store = load('src/stores/fipeStore.ts').useFipeStore;
  // Saving before hydration must first load existing device data.
  await store.getState().saveQuote(vehicle.id, quote);
  assert.equal(store.getState().hydrated, true);
  store = load('src/stores/fipeStore.ts').useFipeStore;
  await store.getState().hydrate();
  assert.deepEqual(savedFipeFor(vehicle, store.getState().quotes), quote, 'Survive restart');
  assert.equal(vehiclePriceSummary(vehicle, store.getState().quotes).value, quote.price.Valor, 'Cards must use persisted FIPE on restart');
  assert.ok(vehiclePriceSummary(vehicle, store.getState().quotes).reference.includes(quote.price.MesReferencia));
  assert.equal(vehiclePriceSummary({ ...vehicle, price: 499000, priceReference: 'Histórico' }, store.getState().quotes).value, quote.price.Valor, 'FIPE takes priority over historical price on cards');
  assert.equal(savedFipeFor({ ...vehicle, year: 2024 }, store.getState().quotes), undefined);
  assert.equal(savedFipeFor({ ...vehicle, version: 'Outra versão' }, store.getState().quotes), undefined);
  assert.ok(savedFipeFor(vehicle, { [vehicle.id]: { ...quote, price: { ...quote.price, Modelo: 'RANGER RAPTOR 3.0 V6 ' } } }), 'Accepted formatting variants must remain visible after saving');
  const corolla = { ...vehicle, brand: 'Toyota', model: 'Corolla', version: 'XEi' };
  const crossQuote = { ...quote, catalogKey: fipeCatalogKey(corolla), model: { codigo: 2, nome: 'Corolla Cross XRE' }, price: { ...quote.price, Modelo: 'Corolla Cross XRE' } };
  assert.equal(savedFipeFor(corolla, { [corolla.id]: crossQuote }), undefined, 'Previously saved wrong-family association must not be reused');
  const next = { ...quote, price: { ...quote.price, Valor: 'R$ 399.000,00' } };
  failWrite = true;
  await assert.rejects(store.getState().saveQuote(vehicle.id, next), /salvar/);
  assert.deepEqual(store.getState().quotes[vehicle.id], quote, 'Failed update preserves previous quote');
  failWrite = false;
  await Promise.all([
    store.getState().saveQuote(vehicle.id, next),
    store.getState().saveQuote(second.id, { ...quote, catalogKey: fipeCatalogKey(second) }),
  ]);
  assert.equal(Object.keys(store.getState().quotes).length, 2, 'Concurrent writes must not lose another vehicle');
  const sections = selectComparisonAttributes([vehicle, second], ['Preço FIPE'], store.getState().quotes);
  const rows = sections.flatMap(s => s.rows);
  assert.deepEqual(rows.map(r => r.label), ['Preço FIPE', 'Versão consultada na FIPE', 'Referência FIPE']);
  assert.ok(rows.every(r => r.winnerIds.length === 0));
  const share = buildComparisonShare([vehicle, second], sections);
  for (const text of ['399.000', '400.000', '003001-1', 'setembro de 2026', '27/09/2026', 'Gasolina', 'Ranger Raptor 3.0 V6']) assert.ok(share.includes(text), text);
  await store.getState().removeQuote(vehicle.id);
  store = load('src/stores/fipeStore.ts').useFipeStore;
  await store.getState().hydrate();
  assert.equal(savedFipeFor(vehicle, store.getState().quotes), undefined);
  assert.equal(vehiclePriceSummary(vehicle, store.getState().quotes).value, 'Consultar FIPE na ficha', 'Removing quote restores consultation prompt');
  assert.ok(vehiclePriceSummary({ ...vehicle, price: 499000, priceReference: 'Histórico' }, {}).value.includes('histórico'));
  assert.ok(savedFipeFor(second, store.getState().quotes));
  disk = '{broken';
  store = load('src/stores/fipeStore.ts').useFipeStore;
  await store.getState().hydrate();
  assert.equal(store.getState().hydrated, false);
  assert.ok(store.getState().hydrationError);
  disk = null;
  await store.getState().hydrate();
  assert.equal(store.getState().hydrated, true, 'Hydration can retry');
  console.log('Saved FIPE checks passed: restart, failed update, concurrent saves, stale version/year, removal, references in sharing and recovery from read failure.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
