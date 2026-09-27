import type { VehicleMock } from '@/src/data/vehicles.mock';
import { dataStatus } from './catalogPresentation';
import { savedFipeFor, fipeConsultedDate, type FipeQuotes } from './savedFipe';

export interface ComparisonRow {
  label: string;
  values: string[];
  winnerIds: string[];
}
export interface ComparisonSection {
  id: string;
  title: string;
  rows: ComparisonRow[];
}
type Direction = 'higher' | 'lower' | 'none';

export function attributeKey(label: string): string {
  return label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

// Rank only single numeric values with matching units, never ranges or absent data.
function measurement(value: string): { value: number; unit: string } | null {
  const match = value.trim().match(/^(\d+(?:[.,]\d+)?)\s*([^\d]*)$/);
  return match ? { value: Number(match[1].replace(',', '.')), unit: match[2].trim().toLowerCase() } : null;
}

export function buildComparisonSections(vehicles: VehicleMock[], quotes: FipeQuotes = {}): ComparisonSection[] {
  function row(label: string, display: (v: VehicleMock) => string | undefined,
    direction: Direction = 'none', numeric?: (v: VehicleMock) => number | undefined, comparable = true,
  ): ComparisonRow {
    const values = vehicles.map(v => display(v) || 'Não disponível');
    const measurements = values.map(measurement);
    const numbers = vehicles.map((v, i) => numeric ? numeric(v) : measurements[i]?.value);
    const sameUnits = numeric || measurements.every(item => item && item.unit === measurements[0]?.unit);
    const complete = numbers.every(value => value !== undefined && Number.isFinite(value));
    let winnerIds: string[] = [];
    const verified = vehicles.every(v => v.confidenceStatus === 'verificado');
    if (vehicles.length >= 2 && verified && direction !== 'none' && comparable && sameUnits && complete) {
      const valid = numbers as number[];
      const best = direction === 'higher' ? Math.max(...valid) : Math.min(...valid);
      // All-way ties are neutral; shared best values can be highlighted.
      if (!valid.every(value => value === best)) {
        winnerIds = vehicles.filter((_, i) => valid[i] === best).map(v => v.id);
      }
    }
    return { label, values, winnerIds };
  }
  const sameFuel = vehicles.every(v => v.fuel === vehicles[0]?.fuel);
  const consumptionComparable = (getValue: (v: VehicleMock) => string | undefined): boolean =>
    sameFuel && vehicles.every(v => measurement(getValue(v) ?? '')?.unit === 'km/l');
  const sections: ComparisonSection[] = [
    { id: 'motor', title: 'Motor', rows: [
      row('Tipo', v => v.engineType), row('Potência', v => v.power, 'higher'),
      row('Torque', v => v.torque, 'higher'), row('Combustível', v => v.fuel),
    ] },
    { id: 'transmission', title: 'Transmissão', rows: [
      row('Câmbio', v => v.transmission), row('Tração', v => v.traction),
    ] },
    { id: 'performance', title: 'Desempenho', rows: [
      row('Consumo urbano', v => v.urbanConsumption, 'higher', undefined, consumptionComparable(v => v.urbanConsumption)),
      row('Consumo rodoviário', v => v.highwayConsumption, 'higher', undefined, consumptionComparable(v => v.highwayConsumption)),
      row('0–100 km/h', v => v.acceleration, 'lower'), row('Vel. máxima', v => v.topSpeed, 'higher'),
    ] },
    { id: 'dimensions', title: 'Dimensões', rows: [
      row('Comprimento', v => v.dimensions ? `${v.dimensions.comprimento.toLocaleString('pt-BR')} mm` : undefined),
      row('Largura', v => v.dimensions ? `${v.dimensions.largura.toLocaleString('pt-BR')} mm` : undefined),
      row('Altura', v => v.dimensions ? `${v.dimensions.altura.toLocaleString('pt-BR')} mm` : undefined),
      row('Entre-eixos', v => v.dimensions ? `${v.dimensions.entre_eixos.toLocaleString('pt-BR')} mm` : undefined),
      row('Porta-malas / caçamba', v => v.dimensions?.portaMalas !== undefined ? `${v.dimensions.portaMalas} L` : undefined),
      row('Peso', v => v.weight === undefined ? undefined : `${v.weight.toLocaleString('pt-BR')} kg`),
    ] },
    { id: 'price', title: 'Preço', rows: [
      row('Preço FIPE', v => savedFipeFor(v, quotes)?.price.Valor ?? 'Ainda não consultado'),
      row('Versão consultada na FIPE', v => {
        const saved = savedFipeFor(v, quotes);
        return saved ? `${saved.price.Modelo} · ${saved.price.AnoModelo} · ${saved.price.Combustivel}\nCódigo FIPE: ${saved.price.CodigoFipe}` : '—';
      }),
      row('Referência FIPE', v => {
        const saved = savedFipeFor(v, quotes);
        return saved ? `${saved.price.MesReferencia}\nConsultado em ${fipeConsultedDate(saved)}` : '—';
      }),
    ] },
  ];
  sections.push({ id: 'safety', title: 'Segurança', rows: [
    row('Equipamentos de segurança', v => v.safetyFeatures?.join('; ')),
  ] });
  const attributes = new Map<string, string>();
  for (const vehicle of vehicles) {
    for (const item of vehicle.otherAttributes ?? []) {
      if (!attributes.has(attributeKey(item.label))) attributes.set(attributeKey(item.label), item.label);
    }
  }
  if (attributes.size) sections.push({ id: 'attributes', title: 'Outros atributos', rows:
    [...attributes.values()].map(label => row(label, v => v.otherAttributes?.find(item => attributeKey(item.label) === attributeKey(label))?.value)),
  });
  return sections;
}

export function selectComparisonAttributes(vehicles: VehicleMock[], selected: string[] | null, quotes: FipeQuotes = {}): ComparisonSection[] {
  const sections = buildComparisonSections(vehicles, quotes);
  if (selected === null) return sections.map(section => ({
    ...section,
    rows: section.rows.filter(row => row.values.some(value => value !== 'Não disponível' && value !== '—')),
  })).filter(section => section.rows.length > 0);
  const requested = new Map(selected.map(label => [attributeKey(label), label.trim()]));
  requested.delete('');
  // A displayed/shared quote must retain its selected version and reference.
  if (requested.has(attributeKey('Preço FIPE'))) {
    requested.set(attributeKey('Versão consultada na FIPE'), 'Versão consultada na FIPE');
    requested.set(attributeKey('Referência FIPE'), 'Referência FIPE');
  }
  const result = sections.map(section => ({ ...section, rows: section.rows.filter(row => requested.has(attributeKey(row.label))) })).filter(section => section.rows.length > 0);
  const known = new Set(sections.flatMap(section => section.rows.map(row => attributeKey(row.label))));
  const custom = [...requested].filter(([key]) => !known.has(key)).map(([key, label]) => ({
    label,
    values: vehicles.map(v => v.safetyFeatures?.some(feature => attributeKey(feature) === key) ? 'Presente' : 'Não disponível'),
    winnerIds: [],
  }));
  if (custom.length) result.push({ id: 'custom', title: 'Atributos solicitados', rows: custom });
  return result;
}

export function buildComparisonShare(vehicles: VehicleMock[], sections: ComparisonSection[]): string {
  return [
    'Comparação BlindSpot',
    ...vehicles.map((v, i) => `${i + 1}. ${v.brand} ${v.model} ${v.year} — ${v.version}`), '',
    ...sections.flatMap(section => [section.title, ...section.rows.map(row =>
      `${row.label}: ${row.values.map((value, i) => `${i + 1}: ${value}`).join(' | ')}`,
    ), '']),
    'Validação e fontes',
    ...vehicles.flatMap((v, i) => [
      `${i + 1}. ${v.brand} ${v.model}: ${dataStatus(v)}`,
      ...(v.dataSources ?? []).map(source => `Fonte: ${source}`),
      ...(v.sourceLinks ?? []).map(source => `${source.title}: ${source.url}`),
      ...(v.dataNotes ?? []).map(note => `Observação: ${note}`),
    ]),
    'Consultas FIPE salvas via Parallelum: confira versão, combustível, mês de referência e data de consulta; não são atualizadas automaticamente. Preços históricos não são cotações atuais nem valores FIPE. Dados não verificados não sustentam recomendações. Ausências não significam que o veículo não possui o equipamento.',
  ].join('\n');
}
