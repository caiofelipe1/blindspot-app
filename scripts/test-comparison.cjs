const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// Compile these pure modules in memory, without loading React Native or image assets.
function load(relativePath) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const output = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = module.paths;
  const originalRequire = compiled.require.bind(compiled);
  compiled.require = request => ['./catalogPresentation', './savedFipe'].includes(request)
    ? load(`src/utils/${request.slice(2)}.ts`)
    : request === '../services/fipeLookup' ? load('src/services/fipeLookup.ts') : originalRequire(request);
  compiled._compile(output, filename);
  return compiled.exports;
}

const { buildComparisonSections, buildComparisonShare, selectComparisonAttributes } = load('src/utils/comparison.ts');
const { useComparisonStore: store } = load('src/stores/comparisonStore.ts');
const cars = [
  { id: 'a', brand: 'Ford', model: 'A', version: 'V1', year: 2025, fuel: 'Gasolina', power: '150 cv', torque: '200 Nm', acceleration: '9,5 s', price: 150000, urbanConsumption: '10 km/l' },
  { id: 'b', brand: 'Ford', model: 'B', version: 'V2', year: 2025, fuel: 'Gasolina', power: '200 cv', torque: '250 Nm', acceleration: '8,5 s', price: 120000, urbanConsumption: '12 km/l' },
  { id: 'c', brand: 'Ford', model: 'C', version: 'V3', year: 2025, fuel: 'Gasolina', power: '300 cv', torque: '300 Nm', acceleration: '6,5 s', price: 100000, urbanConsumption: '14 km/l' },
].map(car => ({ ...car, confidenceStatus: 'verificado' }));
const row = (vehicles, label) => buildComparisonSections(vehicles).flatMap(s => s.rows).find(r => r.label === label);

assert.deepEqual(row(cars, 'Potência').winnerIds, ['c'], 'Third vehicle must participate in ranking');
assert.deepEqual(row(cars.slice(0, 2), 'Potência').winnerIds, ['b']);
assert.deepEqual(row(cars, '0–100 km/h').winnerIds, ['c'], 'Brazilian decimals must compare numerically');
assert.equal(row(cars, 'Preço de referência'), undefined, 'Historical prices must not be mixed with FIPE comparison');
assert.deepEqual(row(cars.map(car => ({ ...car, confidenceStatus: 'nao_verificado' })), 'Potência').winnerIds, [], 'Unverified specifications must not rank');
assert.deepEqual(row(cars.map(car => ({ ...car, confidenceStatus: 'parcial' })), 'Potência').winnerIds, [], 'Partial review must not imply full verification');
assert.deepEqual(row(cars, 'Consumo urbano').winnerIds, ['c']);
assert.equal(row(cars, 'Tipo').values[2], 'Não disponível');
assert.deepEqual(row([cars[0], { ...cars[1], power: undefined }, cars[2]], 'Potência').winnerIds, []);
assert.deepEqual(row([cars[0], { ...cars[1], power: '200 kW' }], 'Potência').winnerIds, []);
assert.deepEqual(row(cars.map(v => ({ ...v, power: '200 cv' })), 'Potência').winnerIds, []);
assert.deepEqual(row([cars[0], { ...cars[1], power: '300 cv' }, cars[2]], 'Potência').winnerIds, ['b', 'c']);
assert.deepEqual(row([cars[0], { ...cars[1], fuel: 'Diesel' }], 'Consumo urbano').winnerIds, []);
assert.deepEqual(row(cars.map(v => ({ ...v, urbanConsumption: '20 kWh/100 km' })), 'Consumo urbano').winnerIds, []);
assert.deepEqual(row([cars[0], { ...cars[1], power: '180/200 cv' }], 'Potência').winnerIds, []);
assert.deepEqual(row([cars[0]], 'Potência').winnerIds, []);
assert.equal(buildComparisonSections([]).every(s => s.rows.every(r => r.values.length === 0)), true);

const shared = buildComparisonShare(cars, buildComparisonSections(cars));
const filtered = selectComparisonAttributes(cars, ['Potência', 'Torque']);
assert.deepEqual(filtered.flatMap(s => s.rows.map(r => r.label)), ['Potência', 'Torque']);
assert.ok(!buildComparisonShare(cars, filtered).includes('Preço de referência:'));
const customCars = [
  { ...cars[0], otherAttributes: [{ label: 'Suspensão', value: 'FOX' }] },
  cars[1], cars[2],
];
const customized = selectComparisonAttributes(customCars, [' suspensao ', 'Autonomia lunar', 'autonomia lunar']);
assert.equal(customized.flatMap(s => s.rows).length, 2, 'Custom labels must be deduplicated');
assert.deepEqual(customized[0].rows[0].values, ['FOX', 'Não disponível', 'Não disponível']);
assert.deepEqual(customized[1].rows[0].values, cars.map(() => 'Não disponível'));
assert.deepEqual(selectComparisonAttributes(cars, []), []);
assert.ok(selectComparisonAttributes(cars, null).flatMap(s => s.rows).every(r => r.values.some(v => v !== 'Não disponível' && v !== '—')), 'Default comparison must hide rows with no information for any vehicle');
assert.ok(selectComparisonAttributes(cars, null).flatMap(s => s.rows).some(r => r.label === 'Preço FIPE'), 'Keep the entry point to consult FIPE before any quote is saved');
assert.ok(selectComparisonAttributes([cars[1], cars[0]], ['Suspensão']).some(s => s.rows[0].label === 'Suspensão'), 'Requested absent attributes must survive vehicle replacement');
for (const car of cars) assert.ok(shared.includes(`${car.brand} ${car.model} ${car.year} — ${car.version}`));
assert.ok(shared.includes('3: 300 cv'));
assert.ok(shared.includes('Não disponível'));

store.getState().clearAll();
store.getState().setAttributes(['Potência', 'Suspensão']);
for (const id of ['a', 'a', 'b', 'c', 'd']) store.getState().addVehicle(id);
assert.deepEqual(store.getState().selectedIds, ['a', 'b', 'c'], 'Duplicates and fourth car must be rejected');
store.getState().replaceVehicle('b', 'd');
assert.deepEqual(store.getState().selectedIds, ['a', 'd', 'c'], 'Replacement must retain its column even at capacity');
assert.deepEqual(store.getState().selectedAttributes, ['Potência', 'Suspensão']);
store.getState().replaceVehicle('a', 'c');
store.getState().replaceVehicle('missing', 'b');
assert.deepEqual(store.getState().selectedIds, ['a', 'd', 'c']);
store.getState().removeVehicle('d');
store.getState().addVehicle('b');
assert.deepEqual(store.getState().selectedIds, ['a', 'c', 'b']);
store.getState().clearAll();
assert.deepEqual(store.getState().selectedIds, []);
console.log('Comparison checks passed: 0–3 vehicles, highlights, ties, missing data, units, sharing and selection.');
