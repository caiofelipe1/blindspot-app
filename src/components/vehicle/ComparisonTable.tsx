import { Image, Pressable, Text, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import type { VehicleMock } from '@/src/data/vehicles.mock';
import type { ComparisonSection } from '@/src/utils/comparison';
import { dataStatus } from '@/src/utils/catalogPresentation';
import { VehiclePriceSummary } from './VehiclePriceSummary';
import { colors } from '@/src/styles/tokens';

interface Props {
  vehicles: VehicleMock[];
  sections: ComparisonSection[];
  expanded: Set<string>;
  columnWidth: number;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
  onReplace: (id: string) => void;
  onRemove: (id: string) => void;
}
export function ComparisonTable({ vehicles, sections, expanded, columnWidth, onToggle, onOpen, onReplace, onRemove }: Props) {
  return (
    <View style={{ width: columnWidth * vehicles.length }}>
      <View className="flex-row">
        {vehicles.map(v => (
          <View key={v.id} style={{ width: columnWidth }} className="border-r border-background">
            <Pressable onPress={() => onOpen(v.id)} accessibilityRole="button" accessibilityLabel={`Abrir ficha de ${v.brand} ${v.model}`}>
              <Image source={v.image} className="w-full h-32" resizeMode="cover" />
              <View className="p-3 gap-1">
                <Text className="text-base font-semibold text-normal">{v.brand} {v.model}</Text>
                <Text className="text-sm text-subtle-dark">{v.year} · {v.version}</Text>
                <VehiclePriceSummary vehicle={v} />
                <Text className="text-xs text-subtle-dark">{dataStatus(v)}</Text>
              </View>
            </Pressable>
            <View className="mt-auto px-3 pb-3 gap-1">
              <Pressable onPress={() => onReplace(v.id)} accessibilityRole="button" accessibilityLabel={`Trocar ${v.model}`} className="rounded-lg bg-background py-3 items-center">
                <Text className="text-sm font-semibold text-primary">Trocar</Text>
              </Pressable>
              <Pressable onPress={() => onRemove(v.id)} accessibilityRole="button" accessibilityLabel={`Remover ${v.model} da comparação`} className="py-3 items-center">
                <Text className="text-sm text-subtle-dark">Remover</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
      {sections.map(section => (
        <View key={section.id} className="border-t border-background">
          <Pressable onPress={() => onToggle(section.id)} accessibilityRole="button" accessibilityState={{ expanded: expanded.has(section.id) }} className="flex-row items-center gap-2 px-4 py-4">
            <Text className="text-base font-semibold text-normal">{section.title}</Text>
            {expanded.has(section.id) ? <ChevronUp size={18} color={colors.primary} /> : <ChevronDown size={18} color={colors.primary} />}
          </Pressable>
          {expanded.has(section.id) && section.rows.map(row => (
            <View key={row.label} className="bg-background border-b border-white py-3">
              <View className="flex-row">
                {vehicles.map(v => <Text key={v.id} style={{ width: columnWidth }} className="px-3 pb-2 text-xs text-center text-subtle-dark">{row.label}</Text>)}
              </View>
              <View className="flex-row">
                {vehicles.map((v, i) => (
                  <View key={v.id} style={{ width: columnWidth }} className="px-3">
                    <Text className={`text-sm text-center ${row.winnerIds.includes(v.id) ? 'font-bold text-primary' : 'text-normal'}`}>{row.values[i]}</Text>
                    {row.label === 'Preço FIPE' && <Pressable onPress={() => onOpen(v.id)} accessibilityRole="button" accessibilityLabel={`Consultar FIPE na ficha de ${v.model}`} className="py-3">
                      <Text className="text-xs text-primary text-center">Consultar na ficha</Text>
                    </Pressable>}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
