import { useEffect } from 'react';
import { View, Text, Pressable, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';

import { VehicleSection } from '@/src/components/vehicle/VehicleSection';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { colors } from '@/src/styles/tokens';
import { useVehicleStore } from '@/src/stores/vehicleStore';
import {
  popularVehicles,
  favoriteVehicles,
  electricVehicles,
} from '@/src/data/vehicles.mock';

function ReferenceVehicleBanner({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, marginHorizontal: 24, marginBottom: 16 })}
    >
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(0,119,200,0.2)',
        }}
      >
        {/* Faixa azul superior */}
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 16,
            paddingVertical: 7,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: '700',
              color: '#FFFFFF',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Veículo de referência · Ford FIAP 2026
          </Text>
        </View>

        {/* Corpo do card */}
        <View
          style={{
            backgroundColor: '#EBF4FC',
            paddingHorizontal: 16,
            paddingVertical: 14,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ gap: 3 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.normal, letterSpacing: 0.2 }}>
              Ford Ranger Raptor
            </Text>
            <Text style={{ fontSize: 12, color: colors.subtleDark }}>
              3.0 V6 Biturbo · 2025 · 397 cv
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              backgroundColor: colors.primary,
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#FFFFFF' }}>
              Ver ficha
            </Text>
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>→</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const POPULAR_BRANDS = [
  'Toyota', 'Honda', 'Volkswagen', 'Fiat', 'Chevrolet',
  'Ford', 'Hyundai', 'Renault', 'Jeep', 'BMW',
];

export default function ExploreScreen() {
  const router = useRouter();
  const { fipeBrands, fipeBrandsLoading, fetchFipeBrands } = useVehicleStore();

  useEffect(() => {
    fetchFipeBrands();
  }, []);

  const brandsToShow = fipeBrands.length > 0
    ? fipeBrands.slice(0, 20)
    : POPULAR_BRANDS.map((nome, i) => ({ codigo: String(i), nome }));

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>

      {/* Busca */}
      <View className="px-6 pt-[18px] pb-[16px]">
        <Pressable
          onPress={() => router.push('/search')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            borderWidth: 1,
            borderColor: colors.subtleLight,
            borderRadius: 24,
            paddingHorizontal: 20,
            height: 48,
            opacity: 0.6,
          }}
        >
          <Search size={16} color={colors.subtleDark} strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.subtleDark,
              letterSpacing: 0.4,
            }}
          >
            Buscar veículo
          </Text>
        </Pressable>
      </View>

      {/* Banner veículo de referência */}
      <ReferenceVehicleBanner onPress={() => router.push('/vehicle/1' as never)} />

      {/* Marcas FIPE */}
      <View style={{ marginBottom: 8 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.normal }}>
            Marcas
          </Text>
          {fipeBrandsLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={{ fontSize: 11, color: colors.subtleDark, letterSpacing: 0.3 }}>
              via FIPE
            </Text>
          )}
        </View>
        <FlatList
          data={brandsToShow}
          keyExtractor={item => item.codigo}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push('/search')}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.background,
                backgroundColor: colors.background,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: colors.subtleDark,
                  letterSpacing: 0.3,
                }}
              >
                {item.nome}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Seções de veículos */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 24, paddingBottom: 16 }}
      >
        <VehicleSection
          title="Mais acessados essa semana"
          vehicles={popularVehicles}
        />

        <VehicleSection
          title="Favoritos para acessar agora"
          vehicles={favoriteVehicles}
        />

        <VehicleSection
          title="Top elétricos custo benefício"
          vehicles={electricVehicles}
        />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}
