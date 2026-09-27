import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, X } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/styles/tokens';
import { attributeKey, type ComparisonSection } from '@/src/utils/comparison';

interface Props {
  available: ComparisonSection[];
  selected: string[] | null;
  onApply: (labels: string[] | null) => void;
  onClose: () => void;
}

export function ComparisonAttributes({ available, selected, onApply, onClose }: Props) {
  const defaults = [...new Map(available.flatMap(s => s.rows.map(r => [attributeKey(r.label), r.label] as const))).values()];
  const [draft, setDraft] = useState<string[]>(selected?.filter(label => defaults.some(d => attributeKey(d) === attributeKey(label))) ?? defaults);
  function toggle(label: string): void {
    setDraft(previous => previous.some(item => attributeKey(item) === attributeKey(label))
      ? previous.filter(item => attributeKey(item) !== attributeKey(label)) : [...previous, label]);
  }
  function option(label: string) {
    const checked = draft.some(item => attributeKey(item) === attributeKey(label));
    return (
      <Pressable key={attributeKey(label)} onPress={() => toggle(label)} accessibilityRole="checkbox" accessibilityState={{ checked }} className="flex-row items-center gap-3 py-3">
        <View className={`w-6 h-6 rounded border items-center justify-center ${checked ? 'bg-primary border-primary' : 'border-subtle-light'}`}>
          {checked && <Check size={16} color={colors.white} />}
        </View>
        <Text className="flex-1 text-base text-normal">{label}</Text>
      </Pressable>
    );
  }
  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1">
          <View className="px-6 py-3 flex-row items-center gap-3">
            <Text className="flex-1 text-xl font-semibold text-normal">Escolher atributos</Text>
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Cancelar seleção de atributos" className="p-3 rounded-full bg-background"><X size={20} color={colors.normal} /></Pressable>
          </View>
          <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
            <Text className="text-sm text-subtle-dark mb-3">Escolha o que deseja comparar. O preço FIPE usa a consulta salva na ficha e inclui sua versão e referência.</Text>
            <View className="flex-row flex-wrap gap-4 mb-3">
              <Pressable onPress={() => setDraft(defaults)} accessibilityRole="button" className="py-2"><Text className="text-primary font-semibold">Selecionar todos</Text></Pressable>
              <Pressable onPress={() => setDraft([])} accessibilityRole="button" className="py-2"><Text className="text-subtle-dark">Desmarcar todos</Text></Pressable>
            </View>
            {available.map(section => <View key={section.id} className="mb-4">
              <Text className="text-lg font-semibold text-normal border-b border-background py-2">{section.title}</Text>
              {section.rows.map(row => option(row.label))}
            </View>)}
          </ScrollView>
          <View className="px-6 py-3 border-t border-background gap-2">
            <Text className="text-sm text-subtle-dark">{draft.length ? `${draft.length} atributos selecionados` : 'Selecione pelo menos um atributo.'}</Text>
            <Button size="sm" label="Aplicar seleção" disabled={draft.length === 0} onPress={() => onApply(draft)} />
            <Pressable onPress={() => onApply(null)} accessibilityRole="button" className="py-2 items-center"><Text className="text-sm text-primary">Restaurar tabela completa</Text></Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
