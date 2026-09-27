import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { SearchSelect } from '@/src/components/ui/SearchSelect';
import { Button } from '@/src/components/ui/Button';
import { ALL_VEHICLES } from '@/src/data/vehicles.mock';
import { catalogOptions, filterCatalog, normalizeSearch, type CatalogFilters } from '@/src/utils/catalogSearch';
import { colors } from '@/src/styles/tokens';

export default function SearchScreen() {
  const { marca } = useLocalSearchParams<{ marca?: string }>();
  return <CatalogSearch key={marca ?? ''} initialBrand={marca} />;
}

function CatalogSearch({ initialBrand }: { initialBrand?: string }) {
  const router = useRouter();
  const [filters, setFilters] = useState<CatalogFilters>(() => ({
    marca: ALL_VEHICLES.find(v => normalizeSearch(v.brand) === normalizeSearch(initialBrand ?? ''))?.brand,
  }));
  const options = catalogOptions(ALL_VEHICLES, filters);
  const count = filterCatalog(ALL_VEHICLES, filters).length;
  const items = (values: string[]) => values.map(value => ({ value, label: value }));
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="px-6 py-4 flex-row items-center justify-between">
        <Text className="text-3xl font-semibold text-normal">Buscar</Text>
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/explore')} accessibilityRole="button" accessibilityLabel="Fechar busca" className="p-3 rounded-full bg-white">
          <X size={20} color={colors.normal} />
        </Pressable>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text className="text-sm text-subtle-dark mb-2">Pesquise as fichas disponíveis no catálogo BlindSpot. Consulte o preço FIPE dentro da ficha do veículo.</Text>
        <SearchSelect label="Marca" placeholder="Todas as marcas" value={filters.marca ?? ''} options={items(options.brands)} onChange={marca => setFilters({ marca })} />
        <SearchSelect label="Modelo" placeholder={filters.marca ? 'Todos os modelos' : 'Selecione uma marca primeiro'} disabled={!filters.marca}
          value={filters.modelo ?? ''} options={items(options.models)} onChange={modelo => setFilters({ marca: filters.marca, modelo })} />
        <SearchSelect label="Ano" placeholder={filters.modelo ? 'Todos os anos' : 'Selecione um modelo primeiro'} disabled={!filters.modelo}
          value={filters.ano ?? ''} options={items(options.years)} onChange={ano => setFilters({ marca: filters.marca, modelo: filters.modelo, ano })} />
        <SearchSelect label="Versão" placeholder={filters.modelo ? 'Todas as versões' : 'Selecione um modelo primeiro'} disabled={!filters.modelo}
          value={filters.versao ?? ''} options={items(options.versions)} onChange={versao => setFilters({ ...filters, versao })} />
      </ScrollView>
      <View className="bg-white px-6 py-4 gap-3">
        <Pressable onPress={() => setFilters({})} accessibilityRole="button" className="py-2 self-start"><Text className="text-sm text-primary font-semibold">Limpar tudo</Text></Pressable>
        <Button label={`Ver ${count} ${count === 1 ? 'veículo' : 'veículos'}`} onPress={() => router.push({ pathname: '/result', params: { ...filters } })} />
      </View>
    </SafeAreaView>
  );
}
