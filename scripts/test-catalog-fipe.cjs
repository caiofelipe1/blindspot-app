const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

function load(relativePath) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = module.paths;
  const originalRequire = compiled.require.bind(compiled);
  compiled.require = request => /\.(jpg|png)$/.test(request) ? request : originalRequire(request);
  compiled._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  return compiled.exports;
}

const { filterCatalog, catalogOptions } = load('src/utils/catalogSearch.ts');
const { ALL_VEHICLES } = load('src/data/vehicles.mock.ts');
const { catalogPrice } = load('src/utils/catalogPresentation.ts');
for (const vehicle of ALL_VEHICLES) {
  assert.notEqual(vehicle.confidenceStatus, 'verificado', 'No complete MY-specific audit has been completed yet');
  if (vehicle.price !== undefined) assert.ok(vehicle.priceReference, 'Every retained catalog price needs provenance');
  if (vehicle.confidenceStatus === 'parcial') assert.ok(vehicle.dataSources?.length && vehicle.dataNotes?.length, 'Partial reviews need sources and scope');
  if (vehicle.price === undefined) assert.equal(catalogPrice(vehicle), 'Preço não disponível');
}
assert.ok(catalogPrice(ALL_VEHICLES.find(v => v.id === '10')).includes('histórico'));
const { exactFipeYears, findFipeBrand, confirmedFipePrice, matchesFipeModel, availableFipeOptions } = load('src/services/fipeLookup.ts');

async function main() {
  assert.equal(matchesFipeModel('Ranger Raptor 3.0 V6', 'Ranger Raptor'), true);
  assert.equal(matchesFipeModel('Ranger XLS 2.0', 'Ranger Raptor'), false);
  assert.equal(matchesFipeModel('Aerostar Mini-Van 3.8', 'Ranger Raptor'), false);
  assert.equal(matchesFipeModel('Apolo 1.8', 'Polo'), false);
  assert.equal(matchesFipeModel('Sealion 7', 'Seal'), false);
  assert.equal(matchesFipeModel('Corolla Cross XRE 2.0', 'Corolla'), false);
  assert.equal(matchesFipeModel('Corolla Cross XRE 2.0', 'Corolla Cross'), true);
  assert.equal(matchesFipeModel('Dolphin Mini (Elétrico)', 'Dolphin'), false);
  assert.equal(matchesFipeModel('Dolphin Plus (Elétrico)', 'Dolphin'), true);
  assert.equal(matchesFipeModel('HR-V EX 1.5', 'HRV'), true);
  assert.equal(matchesFipeModel('Hilux SW4 GRS 2.8', 'Hilux'), false);
  const requestedYears = [];
  const available = await availableFipeOptions({
    getBrands: async () => [{ codigo: '22', nome: 'Ford' }, { codigo: '1', nome: 'Alfa Romeo' }],
    getBrandYears: async () => [{ codigo: '2025-1', nome: '2025 Gasolina' }, { codigo: '2024-1', nome: '2024 Gasolina' }, { codigo: '2025-5', nome: '2025 Flex' }],
    getModelsForYear: async (brand, year) => {
      assert.equal(brand, '22');
      requestedYears.push(year);
      return [{ codigo: 1, nome: 'Aerostar Mini-Van 3.8' }, { codigo: 2, nome: 'Ranger Raptor 3.0 V6' }];
    },
  }, 'Ford', 'Ranger Raptor', 2025);
  assert.deepEqual(requestedYears, ['2025-1', '2025-5'], 'Only the exact year is queried, once per fuel');
  assert.deepEqual(available.options.map(o => o.model.codigo), [2]);
  assert.deepEqual(available.options[0].years.map(y => y.codigo), ['2025-1', '2025-5'], 'Combine fuels for the same version without duplicate models');
  await assert.rejects(availableFipeOptions({
    getBrands: async () => [{ codigo: '22', nome: 'Ford' }],
    getBrandYears: async () => [{ codigo: '2025-1', nome: '2025 Gasolina' }],
    getModelsForYear: async () => { throw new Error('offline'); },
  }, 'Ford', 'Ranger Raptor', 2025), /offline/, 'Connection failures must not be reported as no matching version');
  assert.equal(filterCatalog(ALL_VEHICLES, {}).length, ALL_VEHICLES.length);
  for (const marca of catalogOptions(ALL_VEHICLES, {}).brands) {
    for (const modelo of catalogOptions(ALL_VEHICLES, { marca }).models) {
      for (const ano of catalogOptions(ALL_VEHICLES, { marca, modelo }).years) {
        for (const versao of catalogOptions(ALL_VEHICLES, { marca, modelo, ano }).versions) {
          const results = filterCatalog(ALL_VEHICLES, { marca, modelo, ano, versao });
          assert.ok(results.length > 0, 'Every offered combination must have a real catalog result');
          assert.ok(results.every(v => v.brand === marca && v.model === modelo && String(v.year) === ano && v.version === versao));
        }
      }
    }
  }
  const fixtures = [
    { brand: 'Ford', model: 'Ranger', year: 2025, version: 'XLS' },
    { brand: 'Ford', model: 'Ranger Raptor', year: 2025, version: 'XLS Plus' },
  ];
  assert.equal(filterCatalog(fixtures, { modelo: 'ranger' }).length, 1);
  assert.equal(filterCatalog(fixtures, { versao: 'XLS' }).length, 1);
  assert.equal(filterCatalog(fixtures, { marca: ' FÓRD ' }).length, 2);
  assert.equal(filterCatalog(fixtures, { ano: '32000' }).length, 0);
  assert.equal(filterCatalog(fixtures, { marca: 'BMW' }).length, 0);

  const years = [{ codigo: '2024-1', nome: '2024 Gasolina' }, { codigo: '2025-1', nome: '2025 Gasolina' }, { codigo: '32000-1', nome: 'Zero KM' }, { codigo: '2025-3', nome: '2025 Diesel' }];
  assert.deepEqual(exactFipeYears(years, 2025).map(y => y.codigo), ['2025-1', '2025-3']);
  assert.deepEqual(exactFipeYears(years, 2026), []);
  assert.equal(findFipeBrand([{ codigo: '23', nome: 'GM - Chevrolet' }], 'Chevrolet').codigo, '23');
  assert.equal(findFipeBrand([{ codigo: '1', nome: 'Ford Trucks' }], 'Ford'), undefined);

  const brand = { codigo: '22', nome: 'Ford' };
  const model = { codigo: 123, nome: 'Ranger Raptor 3.0 V6' };
  const result = { AnoModelo: 2025, Modelo: model.nome, Marca: 'Ford', Valor: 'R$ 400.000,00', Combustivel: 'Gasolina', SiglaCombustivel: 'G', CodigoFipe: '003001-1', MesReferencia: 'setembro de 2026' };
  let calls = 0;
  const getPrice = async (...args) => { calls++; assert.deepEqual(args, ['22', 123, '2025-1']); return result; };
  assert.equal(await confirmedFipePrice(getPrice, brand, model, years[1], 2025), result);
  await assert.rejects(confirmedFipePrice(getPrice, brand, model, years[0], 2025), /ano da ficha/);
  assert.equal(calls, 1, 'Invalid year must be rejected before contacting the API');
  // Real API cases observed on 27/09/2026: HR-V 2024-5/F and Dolphin 2024-4/E.
  for (const [code, abbreviation, fuelName] of [['1', 'G', 'Gasolina'], ['2', 'A', 'Álcool'], ['3', 'D', 'Diesel'], ['4', 'E', 'Elétrico'], ['5', 'F', 'Flex']]) {
    const selection = { codigo: `2024-${code}`, nome: `2024 ${fuelName}` };
    const response = { ...result, AnoModelo: 2024, Combustivel: fuelName, SiglaCombustivel: abbreviation };
    assert.equal(await confirmedFipePrice(async () => response, brand, model, selection, 2024), response, `Accept fuel ${code}/${abbreviation}`);
    await assert.rejects(confirmedFipePrice(async () => ({ ...response, SiglaCombustivel: abbreviation === 'G' ? 'F' : 'G' }), brand, model, selection, 2024), /diferente/, `Reject mismatched fuel for ${code}`);
  }
  await assert.rejects(confirmedFipePrice(async () => result, brand, model, { codigo: '2025-99', nome: 'Desconhecido' }, 2025), /diferente/);
  await assert.rejects(confirmedFipePrice(async () => ({ ...result, AnoModelo: 2024 }), brand, model, years[1], 2025), /diferente/);
  await assert.rejects(confirmedFipePrice(async () => ({ ...result, Modelo: 'Outra versão' }), brand, model, years[1], 2025), /diferente/);
  await assert.rejects(confirmedFipePrice(async () => ({ ...result, Marca: 'Outra marca' }), brand, model, years[1], 2025), /diferente/);
  await assert.rejects(confirmedFipePrice(async () => ({ ...result, SiglaCombustivel: 'D' }), brand, model, years[1], 2025), /diferente/);
  await assert.rejects(confirmedFipePrice(async () => ({ ...result, MesReferencia: '' }), brand, model, years[1], 2025), /incompleta/);
  await assert.rejects(confirmedFipePrice(async () => ({ ...result, Valor: 'undefined' }), brand, model, years[1], 2025), /incompleta/);
  await assert.rejects(confirmedFipePrice(async () => { throw new Error('offline'); }, brand, model, years[1], 2025), /offline/);
  console.log(`Catalog/FIPE checks passed for ${ALL_VEHICLES.length} vehicles: available combinations, exact filters, year, version and API failures.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
