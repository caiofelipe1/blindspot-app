// Optional real-network check of the same discovery and price flow used by the app.
const { readFileSync } = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
function load(file) {
  const filename = path.resolve(__dirname, '..', file);
  const compiled = new Module(filename, module);
  compiled.filename = filename; compiled.paths = module.paths;
  compiled._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
  return compiled.exports;
}
async function main() {
  const [brandName = 'Ford', modelName = 'Ranger Raptor', yearArg = '2025', versionPart = ''] = process.argv.slice(2);
  const expectedYear = Number(yearArg);
  const { fipeService: api } = load('src/services/fipeService.ts');
  const { availableFipeOptions, confirmedFipePrice } = load('src/services/fipeLookup.ts');
  const { brand, options } = await availableFipeOptions(api, brandName, modelName, expectedYear);
  if (!brand) throw new Error(`${brandName} unavailable`);
  const option = options.find(o => o.model.nome.toLowerCase().includes(versionPart.toLowerCase()));
  if (!option) throw new Error(`${modelName} ${versionPart} ${expectedYear} unavailable`);
  const { model, years: [year] } = option;
  const result = await confirmedFipePrice(api.getPrice, brand, model, year, expectedYear);
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), model: result.Modelo, year: result.AnoModelo, selectedYear: year.codigo, fuel: result.Combustivel, fuelCode: result.SiglaCombustivel, reference: result.MesReferencia, code: result.CodigoFipe, valid: true }));
}
main().catch(error => { console.error('FIPE live check failed:', JSON.stringify({ message: error.message, status: error.response?.status, code: error.code, endpoint: error.config?.url })); process.exitCode = 1; });
