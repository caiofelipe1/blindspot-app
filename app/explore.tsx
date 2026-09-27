import { View, Text, Pressable, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';

import { VehicleSection } from '@/src/components/vehicle/VehicleSection';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { colors } from '@/src/styles/tokens';
import { catalogOptions } from '@/src/utils/catalogSearch';
import {
  popularVehicles,
  favoriteVehicles,
  electricVehicles,
  ALL_VEHICLES,
} from '@/src/data/vehicles.mock';

const brandsToShow = catalogOptions(ALL_VEHICLES, {}).brands.map(nome => ({ codigo: nome, nome }));

export default function ExploreScreen() {
  const router = useRouter();

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

      {/* Marcas com fichas no catálogo */}
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
            <Text style={{ fontSize: 11, color: colors.subtleDark, letterSpacing: 0.3 }}>
              No catálogo
            </Text>
        </View>
        <FlatList
          data={brandsToShow}
          keyExtractor={item => item.codigo}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push({ pathname: '/search', params: { marca: item.nome } })}
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
          title="Destaques do catálogo"
          vehicles={popularVehicles}
        />

        <VehicleSection
          title="Outros modelos"
          vehicles={favoriteVehicles}
        />

        <VehicleSection
          title="Elétricos"
          vehicles={electricVehicles}
        />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}
