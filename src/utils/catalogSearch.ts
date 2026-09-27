import type { VehicleMock } from '@/src/data/vehicles.mock';

export interface CatalogFilters { marca?: string; modelo?: string; ano?: string; versao?: string }

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
}

export function filterCatalog(vehicles: VehicleMock[], filters: CatalogFilters): VehicleMock[] {
  return vehicles.filter(v =>
    (!filters.marca?.trim() || normalizeSearch(v.brand) === normalizeSearch(filters.marca)) &&
    (!filters.modelo?.trim() || normalizeSearch(v.model) === normalizeSearch(filters.modelo)) &&
    (!filters.ano?.trim() || String(v.year) === filters.ano.trim()) &&
    (!filters.versao?.trim() || normalizeSearch(v.version) === normalizeSearch(filters.versao)),
  );
}

export function catalogOptions(vehicles: VehicleMock[], filters: CatalogFilters) {
  const unique = (values: string[]): string[] => [...new Set(values)].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  return {
    brands: unique(vehicles.map(v => v.brand)),
    models: unique(filterCatalog(vehicles, { marca: filters.marca }).map(v => v.model)),
    years: unique(filterCatalog(vehicles, { marca: filters.marca, modelo: filters.modelo }).map(v => String(v.year))).reverse(),
    versions: unique(filterCatalog(vehicles, { marca: filters.marca, modelo: filters.modelo, ano: filters.ano }).map(v => v.version)),
  };
}
