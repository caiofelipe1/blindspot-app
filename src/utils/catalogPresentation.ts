import type { VehicleMock } from '@/src/data/vehicles.mock';

export function catalogPrice(vehicle: VehicleMock): string {
  if (!vehicle.priceReference || vehicle.price === undefined || !Number.isFinite(vehicle.price)) {
    return 'Preço não disponível';
  }
  return `${vehicle.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })} · histórico`;
}

export function dataStatus(vehicle: VehicleMock): string {
  if (vehicle.confidenceStatus === 'verificado') return 'Verificado';
  if (vehicle.confidenceStatus === 'parcial') return 'Revisão parcial';
  return 'Não verificado';
}
