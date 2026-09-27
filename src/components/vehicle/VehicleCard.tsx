import { dataStatus } from '@/src/utils/catalogPresentation';
import { VehiclePriceSummary } from './VehiclePriceSummary';
import { View, Text, Image, Pressable } from 'react-native';
import { Heart, Fuel, Zap, Car, Settings2 } from 'lucide-react-native';
import { colors } from '@/src/styles/tokens';
import type { VehicleMock } from '@/src/data/vehicles.mock';
import { useFavoritesStore } from '@/src/stores/favoritesStore';

interface VehicleCardProps {
  vehicle: VehicleMock;
  onPress?: () => void;
  width?: number;
}



export function VehicleCard({ vehicle, onPress, width = 170 }: VehicleCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorited = isFavorite(vehicle.id);

  return (
    <Pressable style={{ width }} onPress={onPress}>
      {/* Imagem */}
      <View
        style={{ height: 128, borderRadius: 12, overflow: 'hidden', marginBottom: 5 }}
      >
        <Image
          source={vehicle.image}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />

        {/* Overlay: badge + coração */}
        <View
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: 8 }}
          className="flex-row items-start justify-between"
        >
          {vehicle.isFeatured ? (
            <View
              style={{ backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 24 }}
              className="px-[6px] py-[3px]"
            >
              <Text style={{ fontSize: 10, fontWeight: '500', color: colors.normal, letterSpacing: 0.2 }}>
                Destaque
              </Text>
            </View>
          ) : (
            <View />
          )}

          <Pressable
            onPress={event => {
              event.stopPropagation();
              toggleFavorite(vehicle.id);
            }}
            accessibilityRole="button"
            accessibilityLabel={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            hitSlop={8}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: favorited ? 'rgba(229,62,62,0.15)' : 'rgba(0,0,0,0.30)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Heart
              size={16}
              color={favorited ? '#E53E3E' : colors.white}
              fill={favorited ? '#E53E3E' : 'transparent'}
              strokeWidth={2}
            />
          </Pressable>
        </View>
      </View>

      {/* Informações */}
      <View style={{ gap: 5 }}>
        {/* Título */}
        <Text
          style={{ fontSize: 14, fontWeight: '600', color: colors.normal, letterSpacing: 0.4 }}
          numberOfLines={1}
        >
          {vehicle.brand} {vehicle.model}
        </Text>

        {/* Ano */}
        <View className="flex-row items-center justify-between">
          <Text style={{ fontSize: 12, color: colors.subtleDark }}>
            {vehicle.year}
          </Text>
        </View>

        {/* Grid 2×2: combustível | carroceria / câmbio | potência */}
        <View className="flex-row flex-wrap" style={{ rowGap: 4 }}>
          <View className="flex-row items-center gap-1" style={{ width: '55%' }}>
            <Fuel size={12} color={colors.subtleDark} strokeWidth={1.5} />
            <Text style={{ fontSize: 11, color: colors.subtleDark, flexShrink: 1 }} numberOfLines={1}>
              {vehicle.fuel}
            </Text>
          </View>
          <View className="flex-row items-center gap-1" style={{ width: '45%' }}>
            <Car size={12} color={colors.subtleDark} strokeWidth={1.5} />
            <Text style={{ fontSize: 11, color: colors.subtleDark, flexShrink: 1 }} numberOfLines={1}>
              {vehicle.bodyType}
            </Text>
          </View>
          <View className="flex-row items-center gap-1" style={{ width: '55%' }}>
            <Settings2 size={12} color={colors.subtleDark} strokeWidth={1.5} />
            <Text style={{ fontSize: 11, color: colors.subtleDark, flexShrink: 1 }} numberOfLines={1}>
              {vehicle.transmission}
            </Text>
          </View>
          <View className="flex-row items-center gap-1" style={{ width: '45%' }}>
            <Zap size={12} color={colors.subtleDark} strokeWidth={1.5} />
            <Text style={{ fontSize: 11, color: colors.subtleDark, flexShrink: 1 }} numberOfLines={1}>
              {vehicle.power}
            </Text>
          </View>
        </View>

        {/* Preço */}
        <Text style={{ fontSize: 11, color: colors.subtleDark }}>{dataStatus(vehicle)}</Text>
        <VehiclePriceSummary vehicle={vehicle} />
      </View>
    </Pressable>
  );
}
