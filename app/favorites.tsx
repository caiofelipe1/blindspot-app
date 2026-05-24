import { View, Text, Pressable, ScrollView, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Clock, Heart } from 'lucide-react-native';

import { BottomNav } from '@/src/components/layout/BottomNav';
import { useFavoritesStore } from '@/src/stores/favoritesStore';
import { ALL_VEHICLES } from '@/src/data/vehicles.mock';
import { colors } from '@/src/styles/tokens';
import type { VehicleMock } from '@/src/data/vehicles.mock';

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

interface FavoriteCardProps {
  vehicle: VehicleMock;
  cardWidth: number;
  onPress: () => void;
}

function FavoriteCard({ vehicle, cardWidth, onPress }: FavoriteCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: cardWidth, gap: 8 }}
    >
      <View
        style={{
          height: 157,
          borderRadius: 24,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Image
          source={vehicle.image}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <View style={{ gap: 2 }}>
        <Text
          style={{ fontSize: 14, fontWeight: '500', color: colors.normal, letterSpacing: 0.4 }}
          numberOfLines={1}
        >
          {vehicle.brand} {vehicle.model}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.subtleDark, letterSpacing: 0.4 }}>
          {formatPrice(vehicle.price)}
        </Text>
      </View>
    </Pressable>
  );
}

function RecentCard({ cardWidth }: { cardWidth: number }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push('/explore')}
      style={{ width: cardWidth, gap: 8 }}
    >
      <View
        style={{
          height: 157,
          borderRadius: 24,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Clock size={40} color={colors.subtleLight} strokeWidth={1.5} />
      </View>
      <View style={{ gap: 2 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.normal, letterSpacing: 0.4 }}>
          Vistos recentemente
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.subtleDark, letterSpacing: 0.4 }}>
          Hoje
        </Text>
      </View>
    </Pressable>
  );
}

function EmptyState() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 32 }}>
      <View
        style={{
          width: 72, height: 72, borderRadius: 999,
          backgroundColor: colors.background,
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Heart size={32} color={colors.subtleLight} strokeWidth={1.5} />
      </View>
      <Text style={{ fontSize: 20, fontWeight: '600', color: colors.normal, textAlign: 'center' }}>
        Nenhum favorito ainda
      </Text>
      <Text style={{ fontSize: 14, color: colors.subtleDark, textAlign: 'center', lineHeight: 22 }}>
        Toque no coração de qualquer veículo para salvá-lo aqui.
      </Text>
      <Pressable
        onPress={() => router.push('/explore')}
        style={{
          marginTop: 8,
          backgroundColor: colors.primary,
          paddingHorizontal: 24,
          paddingVertical: 14,
          borderRadius: 16,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.white }}>
          Explorar veículos
        </Text>
      </Pressable>
    </View>
  );
}

export default function FavoritesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { favoriteIds } = useFavoritesStore();

  const GAP = 20;
  const HORIZONTAL_PADDING = 24;
  const cardWidth = (width - HORIZONTAL_PADDING * 2 - GAP) / 2;

  const favoriteVehicles = ALL_VEHICLES.filter(v => favoriteIds.includes(v.id));
  const allCards = [{ type: 'recent' as const }, ...favoriteVehicles.map(v => ({ type: 'vehicle' as const, vehicle: v }))];

  const rows: typeof allCards[] = [];
  for (let i = 0; i < allCards.length; i += 2) {
    rows.push(allCards.slice(i, i + 2));
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingTop: 16,
          paddingBottom: 8,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: '600', color: colors.normal, paddingTop: 32, paddingBottom: 8 }}>
          Favoritos
        </Text>
        {favoriteVehicles.length > 0 && (
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: colors.subtleDark,
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.normal, letterSpacing: 0.4 }}>
              Editar
            </Text>
          </Pressable>
        )}
      </View>

      {favoriteVehicles.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: HORIZONTAL_PADDING,
            paddingTop: 8,
            paddingBottom: 16,
            gap: GAP,
          }}
        >
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: 'row', gap: GAP }}>
              {row.map((item) =>
                item.type === 'recent' ? (
                  <RecentCard key="recent" cardWidth={cardWidth} />
                ) : (
                  <FavoriteCard
                    key={item.vehicle.id}
                    vehicle={item.vehicle}
                    cardWidth={cardWidth}
                    onPress={() => router.push(`/vehicle/${item.vehicle.id}` as never)}
                  />
                ),
              )}
              {row.length === 1 && <View style={{ width: cardWidth }} />}
            </View>
          ))}
        </ScrollView>
      )}

      <BottomNav />
    </SafeAreaView>
  );
}
