import axios from 'axios';

const api = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1/carros',
  timeout: 10000,
  httpsAgent: new (await import('https')).Agent({ rejectUnauthorized: false }),
});

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function wordScore(fipeNome, modelWords) {
  const fn = norm(fipeNome);
  return modelWords.filter(w => new RegExp(`(^|[\\s-])${w}([\\s-]|$)`).test(fn)).length;
}

const vehicles = [
  { brand: 'Ford',        model: 'Ranger Raptor',  year: 2025 },
  { brand: 'Toyota',      model: 'Hilux',           year: 2024 },
  { brand: 'Volkswagen',  model: 'Amarok',          year: 2024 },
  { brand: 'Mitsubishi',  model: 'L200 Triton',     year: 2024 },
  { brand: 'Chevrolet',   model: 'S10',             year: 2024 },
  { brand: 'Renault',     model: 'Duster',          year: 2024 },
  { brand: 'Toyota',      model: 'Corolla',         year: 2024 },
  { brand: 'Honda',       model: 'HR-V',            year: 2024 },
  { brand: 'Volkswagen',  model: 'Polo',            year: 2024 },
  { brand: 'Hyundai',     model: 'HB20S',           year: 2024 },
  { brand: 'Fiat',        model: 'Pulse',           year: 2024 },
  { brand: 'BYD',         model: 'Dolphin',         year: 2024 },
  { brand: 'Volvo',       model: 'EX30',            year: 2024 },
  { brand: 'BYD',         model: 'Seal',            year: 2024 },
  { brand: 'GWM',         model: 'ORA 03',          year: 2024 },
  { brand: 'Tesla',       model: 'Model 3',         year: 2024 },
];

async function testVehicle({ brand, model, year }) {
  try {
    const nb = norm(brand);
    const brands = await api.get('/marcas').then(r => r.data);
    const foundBrand =
      brands.find(b => norm(b.nome) === nb) ??
      brands.find(b => norm(b.nome).includes(nb)) ??
      brands.find(b => nb.includes(norm(b.nome)));
    if (!foundBrand) return `❌ MARCA não encontrada`;

    const nm = norm(model);
    const modelWords = nm.split(/[\s-]+/).filter(w => w.length >= 2);
    const minScore = Math.min(2, modelWords.length);

    const models = await api.get(`/marcas/${foundBrand.codigo}/modelos`).then(r => r.data.modelos);
    const exactMatch = models.find(m => norm(m.nome) === nm);
    const candidates = exactMatch ? [exactMatch] : models
      .map(m => ({ m, score: wordScore(m.nome, modelWords) }))
      .filter(({ score }) => score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ m }) => m);

    if (candidates.length === 0) return `⚠️  MODELO não encontrado`;

    for (const candidate of candidates) {
      const years = await api.get(`/marcas/${foundBrand.codigo}/modelos/${candidate.codigo}/anos`).then(r => r.data);
      const foundYear =
        years.find(y => y.codigo.startsWith(String(year))) ??
        years.find(y => { const fy = parseInt(y.codigo.split('-')[0], 10); return !isNaN(fy) && Math.abs(fy - year) <= 3; });
      if (foundYear) {
        const price = await api.get(`/marcas/${foundBrand.codigo}/modelos/${candidate.codigo}/anos/${foundYear.codigo}`).then(r => r.data);
        return `✅  ${price.Valor}  →  "${price.Modelo}" (${price.AnoModelo})`;
      }
    }
    return `⚠️  ANO ${year} não encontrado em nenhum dos candidatos`;
  } catch (e) {
    return `❌ ERRO: ${e.message}`;
  }
}

console.log('\nTestando FIPE (algoritmo atualizado)...\n');
for (const v of vehicles) {
  const result = await testVehicle(v);
  console.log(`${v.brand} ${v.model} ${v.year}`);
  console.log(`  ${result}\n`);
}
