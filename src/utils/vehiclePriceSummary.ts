import type { VehicleMock } from '@/src/data/vehicles.mock';
import { catalogPrice } from './catalogPresentation';
import { savedFipeFor, type FipeQuotes } from './savedFipe';

export function vehiclePriceSummary(vehicle: VehicleMock, quotes: FipeQuotes) {
  const saved = savedFipeFor(vehicle, quotes);
  if (saved) return {
    value: saved.price.Valor,
    reference: `FIPE da seleção · ${saved.price.MesReferencia}`,
    description: `${saved.price.Modelo}, ${saved.price.AnoModelo}, ${saved.price.Combustivel}`,
  };
  const historical = catalogPrice(vehicle);
  return {
    value: historical === 'Preço não disponível' ? 'Consultar FIPE na ficha' : historical,
    reference: '',
    description: '',
  };
}
