import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Scale, Share2 } from 'lucide-react-native';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { ComparisonPicker } from '@/src/components/vehicle/ComparisonPicker';
import { ComparisonTable } from '@/src/components/vehicle/ComparisonTable';
import { ComparisonAttributes } from '@/src/components/vehicle/ComparisonAttributes';
import { ALL_VEHICLES, type VehicleMock } from '@/src/data/vehicles.mock';
import { MAX_COMPARISON_VEHICLES, useComparisonStore } from '@/src/stores/comparisonStore';
import { colors } from '@/src/styles/tokens';
import { useFipeStore } from '@/src/stores/fipeStore';
import { attributeKey, buildComparisonSections, buildComparisonShare, selectComparisonAttributes } from '@/src/utils/comparison';

type PickerTarget = { kind: 'add' } | { kind: 'replace'; id: string } | null;
const SECTION_IDS = ['motor', 'transmission', 'performance', 'dimensions', 'price', 'safety', 'attributes', 'custom'];
const AVAILABLE_ATTRIBUTES = buildComparisonSections(ALL_VEHICLES);
const AVAILABLE_KEYS = new Set(AVAILABLE_ATTRIBUTES.flatMap(section => section.rows.map(row => attributeKey(row.label))));

export default function ComparisonScreen() {
  const router = useRouter();
  const { quotes, hydrated, hydrationError, hydrate } = useFipeStore();
  useEffect(() => { void hydrate(); }, [hydrate]);
  const { width, fontScale } = useWindowDimensions();
  const { selectedIds, selectedAttributes: savedAttributes, setAttributes, addVehicle, removeVehicle, replaceVehicle, clearAll } = useComparisonStore();
  const knownAttributes = savedAttributes?.filter(label => AVAILABLE_KEYS.has(attributeKey(label)));
  const selectedAttributes = knownAttributes?.length ? knownAttributes : null;
  const [attributesOpen, setAttributesOpen] = useState(false);
  const [picker, setPicker] = useState<PickerTarget>(null);
  const [expanded, setExpanded] = useState(new Set(SECTION_IDS));
  const vehicles = selectedIds.map(id => ALL_VEHICLES.find(v => v.id === id)).filter((v): v is VehicleMock => !!v);
  const sections = vehicles.length >= 2 ? selectComparisonAttributes(vehicles, selectedAttributes, quotes) : [];
  const columnWidth = Math.max(172 * fontScale, width / Math.max(vehicles.length, 2));
  const needsScroll = columnWidth * vehicles.length > width + 1;
  const allExpanded = sections.every(section => expanded.has(section.id));

  function toggleSection(id: string) {
    setExpanded(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  async function shareComparison() {
    try {
      await Share.share({ title: 'Comparação BlindSpot', message: buildComparisonShare(vehicles, sections) });
    } catch {
      Alert.alert('Não foi possível compartilhar', 'Tente novamente. Sua comparação continua disponível.');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-row items-center gap-3 px-5 py-3">
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/explore')} accessibilityRole="button" accessibilityLabel="Voltar" className="p-3 rounded-full bg-background">
          <ArrowLeft size={20} color={colors.normal} />
        </Pressable>
        <View className="flex-1">
          <Text className="text-xl font-semibold text-normal">Comparar</Text>
          <Text className="text-xs text-subtle-dark">{vehicles.length} de {MAX_COMPARISON_VEHICLES} veículos</Text>
        </View>
        {vehicles.length >= 2 && (
          <Pressable onPress={shareComparison} disabled={!hydrated} accessibilityRole="button" accessibilityLabel="Compartilhar comparação" className="p-3 rounded-full bg-background">
            <Share2 size={20} color={colors.normal} />
          </Pressable>
        )}
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-5 py-3 gap-3">
          {!hydrated && <Text className="text-xs text-subtle-dark">{hydrationError ?? 'Carregando consultas salvas…'}</Text>}
          {hydrationError && <Pressable onPress={() => void hydrate()} accessibilityRole="button" className="py-2"><Text className="text-sm text-primary">Tentar novamente</Text></Pressable>}
          {vehicles.length < 2 && (
            <View className="rounded-2xl bg-background p-5 gap-3">
              <Scale size={28} color={colors.primary} />
              <Text className="text-lg font-semibold text-normal">{vehicles.length === 0 ? 'Quais veículos você quer comparar?' : 'Adicione mais um veículo'}</Text>
              <Text className="text-sm text-subtle-dark">Escolha de 2 a 3 veículos do catálogo para consultar as especificações lado a lado.</Text>
            </View>
          )}
          <View className="flex-row flex-wrap items-center gap-3">
            {vehicles.length < MAX_COMPARISON_VEHICLES && (
              <Pressable onPress={() => setPicker({ kind: 'add' })} accessibilityRole="button" className="flex-row items-center gap-2 rounded-xl bg-primary px-4 py-3">
                <Plus size={18} color={colors.white} />
                <Text className="text-sm font-semibold text-white">Adicionar veículo</Text>
              </Pressable>
            )}
            {vehicles.length > 0 && (
              <Pressable onPress={clearAll} accessibilityRole="button" className="px-3 py-3">
                <Text className="text-sm text-subtle-dark">Limpar seleção</Text>
              </Pressable>
            )}
          </View>
          <Pressable onPress={() => setAttributesOpen(true)} accessibilityRole="button" className="rounded-xl border border-primary px-4 py-3 self-start">
            <Text className="text-sm font-semibold text-primary">Escolher atributos{selectedAttributes ? ` (${selectedAttributes.length})` : ''}</Text>
          </Pressable>
          {vehicles.length >= 2 && (
            <>
                <Text className="text-xs text-subtle-dark">Compare as especificações disponíveis. O preço FIPE corresponde à versão e ao mês da consulta salva.</Text>
              <Pressable onPress={() => setExpanded(allExpanded ? new Set() : new Set(SECTION_IDS))} accessibilityRole="button" className="py-2 self-start">
                <Text className="font-semibold text-sm text-primary">{allExpanded ? 'Recolher tudo' : 'Expandir tudo'}</Text>
              </Pressable>
            </>
          )}
          {needsScroll && <Text className="text-sm text-primary">Deslize a tabela para o lado para ver todos os veículos →</Text>}
        </View>
        {vehicles.length > 0 && (
          <ScrollView horizontal nestedScrollEnabled key={vehicles.map(v => v.id).join(',')}>
            <ComparisonTable vehicles={vehicles} sections={sections} expanded={expanded} columnWidth={columnWidth}
              onToggle={toggleSection} onOpen={id => router.push(`/vehicle/${id}`)}
              onReplace={id => setPicker({ kind: 'replace', id })} onRemove={removeVehicle} />
          </ScrollView>
        )}
      </ScrollView>
      <BottomNav />
      {attributesOpen && <ComparisonAttributes available={AVAILABLE_ATTRIBUTES} selected={selectedAttributes} onClose={() => setAttributesOpen(false)}
        onApply={labels => { setAttributes(labels); setExpanded(new Set(SECTION_IDS)); setAttributesOpen(false); }} />}
      {picker && (
        <ComparisonPicker selectedIds={selectedIds} replacing={picker.kind === 'replace'} onClose={() => setPicker(null)}
          onSelect={id => {
            if (picker.kind === 'replace') replaceVehicle(picker.id, id); else addVehicle(id);
            setPicker(null);
          }} />
      )}
    </SafeAreaView>
  );
}
