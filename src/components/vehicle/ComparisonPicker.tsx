import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { ALL_VEHICLES } from '@/src/data/vehicles.mock';
import { colors } from '@/src/styles/tokens';

interface Props {
  selectedIds: string[];
  replacing: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
}
function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
export function ComparisonPicker({ selectedIds, replacing, onSelect, onClose }: Props) {
  const [query, setQuery] = useState('');
  const terms = normalize(query).trim().split(/\s+/);
  const vehicles = ALL_VEHICLES.filter(v => !selectedIds.includes(v.id) && terms.every(term =>
    normalize(`${v.brand} ${v.model} ${v.version} ${v.year}`).includes(term),
  ));
  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center px-6 py-4 gap-3">
          <Text className="flex-1 text-xl font-semibold text-normal">{replacing ? 'Trocar veículo' : 'Adicionar veículo'}</Text>
          <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Fechar seleção" className="p-3 rounded-full bg-background">
            <X size={20} color={colors.normal} />
          </Pressable>
        </View>
        <TextInput value={query} onChangeText={setQuery} placeholder="Marca, modelo, versão ou ano"
          accessibilityLabel="Buscar veículo no catálogo" placeholderTextColor={colors.muted}
          className="mx-6 mb-4 rounded-xl border border-subtle-light px-4 py-3 text-base text-normal"
          autoCorrect={false} autoCapitalize="none" />
        <FlatList data={vehicles} keyExtractor={item => item.id} keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable onPress={() => onSelect(item.id)} accessibilityRole="button"
              accessibilityLabel={`Selecionar ${item.brand} ${item.model}, ${item.version}, ${item.year}`}
              className="mx-6 flex-row items-center gap-3 border-b border-background py-4 active:opacity-70">
              <Image source={item.image} className="w-20 h-16 rounded-lg" resizeMode="cover" />
              <View className="flex-1 gap-1">
                <Text className="font-semibold text-base text-normal">{item.brand} {item.model}</Text>
                <Text className="text-sm text-subtle-dark">{item.version} · {item.year}</Text>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={<Text className="px-6 py-8 text-center text-subtle-dark">Nenhum veículo disponível para essa busca. Tente outro nome ou ano.</Text>} />
      </SafeAreaView>
    </Modal>
  );
}
