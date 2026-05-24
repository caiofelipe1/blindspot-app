import { View, Text, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock } from 'lucide-react-native';

import { BottomNav } from '@/src/components/layout/BottomNav';
import { VehicleCard } from '@/src/components/vehicle/VehicleCard';
import { useRecentlyViewedStore } from '@/src/stores/recentlyViewedStore';
import { ALL_VEHICLES } from '@/src/data/vehicles.mock';
import { colors } from '@/src/styles/tokens';

export default function RecentlyViewedScreen() {
  const router = useRouter();
  const { recentIds } = useRecentlyViewedStore();

  const vehicles = recentIds
    .map(id => ALL_VEHICLES.find(v => v.id === id))
    .filter((v): v is NonNullable<typeof v> => !!v);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: 16,
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.background,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={20} color={colors.normal} strokeWidth={1.5} />
        </Pressable>
        <Text style={{ flex: 1, fontSize: 18, fontWeight: '600', color: colors.normal, letterSpacing: 0.4 }}>
          Vistos recentemente
        </Text>
      </View>

      {vehicles.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 32 }}>
          <View
            style={{
              width: 72, height: 72, borderRadius: 999,
              backgroundColor: colors.background,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Clock size={32} color={colors.subtleLight} strokeWidth={1.5} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.normal, textAlign: 'center' }}>
            Nenhum veículo visto ainda
          </Text>
          <Text style={{ fontSize: 14, color: colors.subtleDark, textAlign: 'center', lineHeight: 22 }}>
            Abra a ficha de qualquer veículo para ele aparecer aqui.
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
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
              Explorar veículos
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}
          columnWrapperStyle={{ gap: 20, marginBottom: 20 }}
          renderItem={({ item }) => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <VehicleCard
                vehicle={item}
                onPress={() => router.push(`/vehicle/${item.id}` as never)}
              />
            </View>
          )}
        />
      )}

      <BottomNav />
    </SafeAreaView>
  );
}
