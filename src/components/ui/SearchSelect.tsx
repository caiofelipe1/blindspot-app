import { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, ChevronDown, X } from 'lucide-react-native';
import { colors } from '@/src/styles/tokens';
import { normalizeSearch } from '@/src/utils/catalogSearch';

export interface SelectOption { value: string; label: string }
interface Props {
  label: string;
  placeholder?: string;
  value: string;
  options: SelectOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function SearchSelect({ label, placeholder = 'Selecione', value, options, disabled, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const terms = normalizeSearch(query).split(/\s+/);
  const filtered = options.filter(option => terms.every(term => normalizeSearch(option.label).includes(term)));
  function select(next: string) { onChange(next); setOpen(false); }
  return (
    <>
      <Pressable accessibilityRole="button" accessibilityLabel={`${label}: ${options.find(o => o.value === value)?.label ?? placeholder}`}
        accessibilityState={{ disabled: !!disabled }} disabled={disabled}
        onPress={() => { setQuery(''); setOpen(true); }}
        className={`rounded-xl border border-subtle-light bg-white p-4 flex-row items-center gap-3 ${disabled ? 'opacity-40' : ''}`}>
        <View className="flex-1 gap-1">
          <Text className="text-xs font-semibold text-subtle-dark">{label}</Text>
          <Text className="text-base text-normal">{options.find(o => o.value === value)?.label ?? placeholder}</Text>
        </View>
        <ChevronDown size={20} color={colors.subtleDark} />
      </Pressable>
      {open && (
        <Modal visible animationType="slide" onRequestClose={() => setOpen(false)}>
          <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 flex-row items-center gap-3">
              <Text className="flex-1 text-xl font-semibold text-normal">{label}</Text>
              <Pressable onPress={() => setOpen(false)} accessibilityRole="button" accessibilityLabel="Fechar seleção" className="p-3 bg-background rounded-full">
                <X size={20} color={colors.normal} />
              </Pressable>
            </View>
            <TextInput value={query} onChangeText={setQuery} accessibilityLabel={`Buscar ${label.toLowerCase()}`}
              placeholder="Digite para filtrar" placeholderTextColor={colors.muted} autoCorrect={false}
              className="mx-6 mb-3 px-4 py-3 rounded-xl border border-subtle-light text-base text-normal" />
            <FlatList data={filtered} keyExtractor={item => item.value} keyboardShouldPersistTaps="handled"
              ListHeaderComponent={<Pressable onPress={() => select('')} accessibilityRole="button" className="px-6 py-4"><Text className="text-primary font-semibold">Limpar seleção</Text></Pressable>}
              renderItem={({ item }) => (
                <Pressable onPress={() => select(item.value)} accessibilityRole="button" accessibilityState={{ selected: value === item.value }} className="mx-6 py-4 border-b border-background flex-row gap-3 items-center">
                  <Text className="flex-1 text-base text-normal">{item.label}</Text>
                  {value === item.value && <Check size={18} color={colors.primary} />}
                </Pressable>
              )}
              ListEmptyComponent={<Text className="px-6 py-8 text-subtle-dark">Nenhuma opção encontrada. Tente outro termo.</Text>} />
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}
