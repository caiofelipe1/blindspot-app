import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';

import { VehicleSection } from '@/src/components/vehicle/VehicleSection';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { colors } from '@/src/styles/tokens';
import {
  popularVehicles,
  favoriteVehicles,
  electricVehicles,
} from '@/src/data/vehicles.mock';

export default function ExploreScreen() {
  const router = useRouter();

  function handleSearch() {
    router.push('/search');
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>

      {/* ── Busca ── */}
      <View className="px-6 pt-[18px] pb-[24px]">
        <Pressable
          onPress={handleSearch}
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

      {/* ── Seções de veículos ── */}
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

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </SafeAreaView>
  );
}
