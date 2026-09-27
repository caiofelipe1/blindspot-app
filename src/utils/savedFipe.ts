import type { VehicleMock } from '@/src/data/vehicles.mock';
import type { FipeBrand, FipeModel, FipeYear, FipeVehiclePrice } from '@/src/services/fipeService';
import { matchesFipeModel, normalizeFipeName } from '../services/fipeLookup';

export type FipeCatalogVehicle = Pick<VehicleMock, 'id' | 'brand' | 'model' | 'version' | 'year'>;
export interface SavedFipeQuote {
  catalogKey: string;
  brand: FipeBrand;
  model: FipeModel;
  year: FipeYear;
  price: FipeVehiclePrice;
  consultedAt: string;
}
export type FipeQuotes = Record<string, SavedFipeQuote>;

export function fipeCatalogKey(vehicle: FipeCatalogVehicle): string {
  return JSON.stringify([vehicle.id, vehicle.brand, vehicle.model, vehicle.version, vehicle.year]);
}

// Never reuse a saved association after the catalog's version or year changes.
export function savedFipeFor(vehicle: FipeCatalogVehicle, quotes: FipeQuotes): SavedFipeQuote | undefined {
  const quote = quotes[vehicle.id];
  return quote?.catalogKey === fipeCatalogKey(vehicle) && quote.price?.AnoModelo === vehicle.year
    && typeof quote.price.Valor === 'string' && typeof quote.price.Modelo === 'string'
    && typeof quote.price.MesReferencia === 'string' && typeof quote.price.CodigoFipe === 'string'
    && typeof quote.brand?.codigo === 'string' && typeof quote.brand?.nome === 'string'
    && typeof quote.model?.codigo === 'number' && typeof quote.model.nome === 'string'
    && normalizeFipeName(quote.model.nome) === normalizeFipeName(quote.price.Modelo)
    && matchesFipeModel(quote.model.nome, vehicle.model)
    && typeof quote.year?.codigo === 'string' && quote.year.codigo.split('-')[0] === String(vehicle.year)
    && Number.isFinite(Date.parse(quote.consultedAt)) ? quote : undefined;
}

export function fipeConsultedDate(quote: SavedFipeQuote): string {
  return new Date(quote.consultedAt).toLocaleDateString('pt-BR');
}
