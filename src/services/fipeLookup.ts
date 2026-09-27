import type { FipeBrand, FipeModel, FipeYear, FipeVehiclePrice } from '@/src/services/fipeService';

export function normalizeFipeName(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
const normalize = normalizeFipeName;

export function findFipeBrand(brands: FipeBrand[], name: string): FipeBrand | undefined {
  const aliases: Record<string, string[]> = { chevrolet: ['gm chevrolet'], volkswagen: ['vw volkswagen'], caoachery: ['caoa chery'] };
  const expected = normalize(name);
  return brands.find(b => [expected, ...(aliases[expected] ?? [])].includes(normalize(b.nome)));
}

export function exactFipeYears(years: FipeYear[], year: number): FipeYear[] {
  return years.filter(item => item.codigo.split('-')[0] === String(year));
}

export function matchesFipeModel(name: string, model: string): boolean {
  const expected = normalize(model).replace(/ /g, '');
  if (!expected) return false;
  // These are different families, not trims of the selected catalog model.
  const actual = normalize(name);
  if (expected === 'corolla' && /^corolla cross\b/.test(actual)) return false;
  if (expected === 'dolphin' && /^dolphin mini\b/.test(actual)) return false;
  if (expected === 'hilux' && /^hilux sw4\b/.test(actual)) return false;
  let prefix = '';
  for (const word of normalize(name).split(' ')) {
    prefix += word;
    if (prefix === expected) return true;
    if (prefix.length >= expected.length) return false;
  }
  return false;
}

interface LookupApi {
  getBrands: () => Promise<FipeBrand[]>;
  getBrandYears: (brand: string) => Promise<FipeYear[]>;
  getModelsForYear: (brand: string, year: string) => Promise<FipeModel[]>;
}

export async function availableFipeOptions(api: LookupApi, brandName: string, modelName: string, year: number) {
  const brand = findFipeBrand(await api.getBrands(), brandName) ?? null;
  const options: { model: FipeModel; years: FipeYear[] }[] = [];
  if (!brand) return { brand, options };
  const years = exactFipeYears(await api.getBrandYears(brand.codigo), year);
  // One request per fuel in the exact year, rather than one per historical trim.
  // Keep failures distinct from an empty result; retries reuse successful responses.
  for (const selectedYear of years) {
    const models = await api.getModelsForYear(brand.codigo, selectedYear.codigo);
    for (const model of models.filter(m => matchesFipeModel(m.nome, modelName))) {
      const existing = options.find(option => option.model.codigo === model.codigo);
      if (existing) existing.years.push(selectedYear);
      else options.push({ model, years: [selectedYear] });
    }
  }
  return { brand, options };
}

export async function confirmedFipePrice(
  getPrice: (brand: string, model: number, year: string) => Promise<FipeVehiclePrice>,
  brand: FipeBrand, model: FipeModel, selectedYear: FipeYear, expectedYear: number,
): Promise<FipeVehiclePrice> {
  if (!exactFipeYears([selectedYear], expectedYear).length) throw new Error('Selecione o ano da ficha para consultar o preço.');
  const price = await getPrice(brand.codigo, model.codigo, selectedYear.codigo);
  // The API also uses dedicated codes for electric and flex vehicles.
  const fuel = { '1': 'G', '2': 'A', '3': 'D', '4': 'E', '5': 'F' }[selectedYear.codigo.split('-')[1]];
  if (!price || price.AnoModelo !== expectedYear || typeof price.Modelo !== 'string'
    || normalize(price.Modelo) !== normalize(model.nome)
    || typeof price.Marca !== 'string' || !findFipeBrand([brand], price.Marca)
    || !fuel || price.SiglaCombustivel !== fuel) {
    throw new Error('A FIPE retornou marca, versão, ano ou combustível diferente da seleção. O preço não será exibido. Tente novamente.');
  }
  if (typeof price.Valor !== 'string' || !/^R\$\s*\d[\d.]*,\d{2}$/.test(price.Valor)
    || typeof price.CodigoFipe !== 'string' || !/^\d{6}-\d$/.test(price.CodigoFipe)
    || typeof price.MesReferencia !== 'string' || !price.MesReferencia.trim()
    || typeof price.Combustivel !== 'string' || !price.Combustivel.trim()) {
    throw new Error('A FIPE retornou uma consulta incompleta. Tente novamente.');
  }
  return price;
}
