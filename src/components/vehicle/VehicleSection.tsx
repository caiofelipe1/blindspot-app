import { View, Text, Pressable, FlatList } from 'react-native';
import { ChevronRight, LayoutGrid } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/styles/tokens';
import { VehicleCard } from './VehicleCard';
import type { VehicleMock } from '@/src/data/vehicles.mock';

interface VehicleSectionProps {
  title: string;
  vehicles: VehicleMock[];
  onSeeAll?: () => void;
}

function ViewMoreCard() {
  return (
    <View
      style={{
        width: 170,
        height: 128,
        borderRadius: 12,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <View
        style={{
          width: 40, height: 40, borderRadius: 999,
          backgroundColor: colors.normal,
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <LayoutGrid size={18} color={colors.white} strokeWidth={1.5} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.normal, letterSpacing: 0.4 }}>
          Ver todos
        </Text>
        <Text style={{ fontSize: 10, color: colors.subtleDark, letterSpacing: 0.2 }}>
          60+ veículos
        </Text>
      </View>
    </View>
  );
}

export function VehicleSection({ title, vehicles, onSeeAll }: VehicleSectionProps) {
  const router = useRouter();

  function handleCardPress(id: string) {
    router.push(`/vehicle/${id}` as never);
  }

  return (
    <View style={{ gap: 16 }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6">
        <Text
          style={{ fontSize: 20, fontWeight: '600', color: colors.normal, flex: 1 }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Pressable
          onPress={onSeeAll}
          hitSlop={8}
          style={{
            width: 32, height: 32, borderRadius: 999,
            backgroundColor: '#EFEFF0',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronRight size={16} color={colors.subtleDark} strokeWidth={1.5} />
        </Pressable>
      </View>

      {/* Lista horizontal */}
      <FlatList
        data={vehicles}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24, gap: 16 }}
        ListFooterComponent={<ViewMoreCard />}
        ListFooterComponentStyle={{ marginLeft: 16 }}
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            onPress={() => handleCardPress(item.id)}
          />
        )}
      />
    </View>
  );
}
