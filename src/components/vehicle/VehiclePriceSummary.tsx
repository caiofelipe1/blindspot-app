import { useEffect } from 'react';
import { Text, View } from 'react-native';
import type { VehicleMock } from '@/src/data/vehicles.mock';
import { useFipeStore } from '@/src/stores/fipeStore';
import { vehiclePriceSummary } from '@/src/utils/vehiclePriceSummary';

export function VehiclePriceSummary({ vehicle, detail = false }: { vehicle: VehicleMock; detail?: boolean }) {
  const { quotes, hydrated, hydrationError, hydrate } = useFipeStore();
  useEffect(() => { void hydrate(); }, [hydrate]);
  if (!hydrated) return <Text className="text-xs text-subtle-dark">
    {hydrationError ? 'Abra a ficha para carregar o preço salvo' : 'Carregando preço…'}
  </Text>;
  const price = vehiclePriceSummary(vehicle, quotes);
  return <View className="gap-1" accessible accessibilityLabel={[price.value, price.reference, price.description].filter(Boolean).join('. ')}>
    <Text className={detail ? 'text-2xl font-bold text-primary' : 'text-sm font-semibold text-normal'}>{detail && price.value === 'Consultar FIPE na ficha' ? 'Consulte o preço FIPE abaixo' : price.value}</Text>
    {!!price.reference && <Text className="text-xs text-subtle-dark">{price.reference}</Text>}
    {detail && !price.reference && !!vehicle.priceReference && <Text className="text-xs text-subtle-dark">{vehicle.priceReference}</Text>}
  </View>;
}
