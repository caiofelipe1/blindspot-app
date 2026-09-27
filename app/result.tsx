import { FlatList, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react-native';

import { VehicleCard } from '@/src/components/vehicle/VehicleCard';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { ALL_VEHICLES } from '@/src/data/vehicles.mock';
import { filterCatalog } from '@/src/utils/catalogSearch';
import { colors } from '@/src/styles/tokens';
import { useVehicleGrid } from '@/src/utils/useVehicleGrid';

function buildSummary(params: { marca?: string; modelo?: string; ano?: string; versao?: string }): string {
  const parts = [params.marca, params.modelo, params.ano, params.versao].filter(p => p?.trim());
  return parts.length > 0 ? parts.join(' · ') : 'Todos os veículos';
}

function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 16 }}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SlidersHorizontal size={32} color={colors.subtleDark} strokeWidth={1.5} />
      </View>
      <View style={{ alignItems: 'center', gap: 6 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.normal, textAlign: 'center' }}>
          Nenhum veículo encontrado
        </Text>
        <Text style={{ fontSize: 14, color: colors.subtleDark, textAlign: 'center', lineHeight: 20 }}>
          Tente ajustar os filtros de busca para ver mais resultados.
        </Text>
      </View>
      <Pressable
        onPress={onBack}
        style={{
          marginTop: 8,
          borderWidth: 1,
          borderColor: colors.subtleLight,
          borderRadius: 12,
          paddingHorizontal: 24,
          paddingVertical: 12,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.normal }}>
          Voltar à busca
        </Text>
      </Pressable>
    </View>
  );
}

export default function ResultScreen() {
  const router = useRouter();
  const grid = useVehicleGrid();
  const params = useLocalSearchParams<{
    marca?: string;
    modelo?: string;
    ano?: string;
    versao?: string;
    catalogo?: string;
  }>();

  const results = filterCatalog(ALL_VEHICLES, params);
  const summary = buildSummary(params);
  const count = results.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
      {/* ── Header ── */}
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
          onPress={() => router.canGoBack() ? router.back() : router.replace('/search')}
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

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.normal,
              letterSpacing: 0.4,
            }}
          >
            {params.catalogo === 'todos' ? 'Todos os veículos' : 'Resultados'}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.subtleDark,
              letterSpacing: 0.2,
              marginTop: 1,
            }}
            numberOfLines={1}
          >
            {params.catalogo === 'todos' ? 'Catálogo BlindSpot' : summary}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'rgba(0,119,200,0.1)',
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: colors.primary,
              letterSpacing: 0.2,
            }}
          >
            {count} {count === 1 ? 'veículo' : 'veículos'}
          </Text>
        </View>
      </View>

      {/* ── Lista ── */}
      {results.length === 0 ? (
        <EmptyState onBack={() => router.canGoBack() ? router.back() : router.replace('/search')} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          key={grid.columns}
          numColumns={grid.columns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 16,
          }}
          columnWrapperStyle={grid.columns > 1 ? { gap: grid.gap } : undefined}
          renderItem={({ item }) => (
            <View className="mb-5">
              <VehicleCard
                vehicle={item}
                width={grid.cardWidth}
                onPress={() => router.push(`/vehicle/${item.id}` as never)}
              />
            </View>
          )}
        />
      )}

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </SafeAreaView>
  );
}
