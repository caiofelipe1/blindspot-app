import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, X, ChevronDown, ChevronUp, Check } from 'lucide-react-native';

import { colors } from '@/src/styles/tokens';
import { fipeService, type FipeBrand, type FipeModel, type FipeYear } from '@/src/services/fipeService';
import { useVehicleStore } from '@/src/stores/vehicleStore';

const POPULAR_BRAND_NAMES = ['Ford', 'Fiat', 'Volkswagen', 'Chevrolet', 'Toyota', 'Hyundai', 'Honda', 'Renault'];

function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// ─── Seletor genérico ────────────────────────────────────────────────
interface SelectorProps<T> {
  label: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  loading?: boolean;
  items: T[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
  onClear: () => void;
  popularKeys?: string[];
  searchPlaceholder?: string;
}

function Selector<T>({
  label,
  placeholder,
  value,
  disabled,
  loading,
  items,
  getKey,
  getLabel,
  onSelect,
  onClear,
  popularKeys,
  searchPlaceholder = 'Buscar…',
}: SelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const popular = useMemo(() => {
    if (!popularKeys || popularKeys.length === 0) return [];
    return popularKeys.flatMap(k => {
      const found = items.find(i => norm(getLabel(i)) === norm(k));
      return found ? [found] : [];
    });
  }, [items, popularKeys]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items.slice(0, 30);
    const q = norm(query);
    return items.filter(i => norm(getLabel(i)).includes(q)).slice(0, 30);
  }, [query, items]);

  function handleSelect(item: T) {
    onSelect(item);
    setOpen(false);
    setQuery('');
  }

  function handleClear() {
    onClear();
    setOpen(false);
    setQuery('');
  }

  const isSelected = !!value;

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: open ? colors.primary : isSelected ? 'rgba(0,119,200,0.25)' : colors.background,
        opacity: disabled ? 0.4 : 1,
      }}
      pointerEvents={disabled ? 'none' : 'auto'}
    >
      {/* Header row */}
      <Pressable
        onPress={() => !disabled && setOpen(o => !o)}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 18, gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: colors.subtleDark, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 2 }}>
              {label}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: '500', color: isSelected ? colors.normal : colors.subtleLight }}>
              {value || placeholder}
            </Text>
          </View>

          {isSelected && !open ? (
            <Pressable onPress={handleClear} hitSlop={10}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
                <X size={12} color={colors.subtleDark} strokeWidth={2} />
              </View>
            </Pressable>
          ) : (
            open
              ? <ChevronUp size={20} color={colors.primary} strokeWidth={1.5} />
              : <ChevronDown size={20} color={colors.subtleDark} strokeWidth={1.5} />
          )}
        </View>
      </Pressable>

      {/* Expanded content */}
      {open && (
        <View style={{ borderTopWidth: 1, borderTopColor: colors.background }}>
          {/* Search input */}
          <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.background,
                borderRadius: 10,
                height: 40,
                paddingHorizontal: 12,
                gap: 8,
              }}
            >
              <Search size={15} color={colors.subtleDark} strokeWidth={1.5} />
              <TextInput
                style={{ flex: 1, fontSize: 14, color: colors.normal }}
                value={query}
                onChangeText={setQuery}
                placeholder={searchPlaceholder}
                placeholderTextColor={colors.subtleLight}
                autoFocus
              />
              {query.length > 0 && (
                <Pressable onPress={() => setQuery('')} hitSlop={8}>
                  <X size={13} color={colors.subtleDark} strokeWidth={1.5} />
                </Pressable>
              )}
            </View>
          </View>

          {loading ? (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={{ fontSize: 13, color: colors.subtleDark, marginTop: 8 }}>Carregando…</Text>
            </View>
          ) : (
            <ScrollView
              style={{ maxHeight: 260 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Popular chips (só quando sem query) */}
              {popular.length > 0 && !query.trim() && (
                <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: colors.subtleDark, letterSpacing: 0.5, marginBottom: 8 }}>
                    POPULARES
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {popular.map(item => (
                        <Pressable
                          key={getKey(item)}
                          onPress={() => handleSelect(item)}
                          style={({ pressed }) => ({
                            opacity: pressed ? 0.7 : 1,
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderRadius: 999,
                            backgroundColor: 'rgba(0,119,200,0.08)',
                            borderWidth: 1,
                            borderColor: 'rgba(0,119,200,0.2)',
                          })}
                        >
                          <Text style={{ fontSize: 13, fontWeight: '500', color: colors.primary }}>
                            {getLabel(item)}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>

                  <View style={{ height: 1, backgroundColor: colors.background, marginTop: 8, marginBottom: 4 }} />
                </View>
              )}

              {/* Lista de resultados */}
              {filtered.length > 0 ? (
                filtered.map((item, idx) => (
                  <Pressable
                    key={getKey(item)}
                    onPress={() => handleSelect(item)}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.6 : 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 14,
                      backgroundColor: norm(getLabel(item)) === norm(value) ? 'rgba(0,119,200,0.05)' : 'transparent',
                      borderTopWidth: idx === 0 ? 0 : 1,
                      borderTopColor: colors.background,
                    })}
                  >
                    <Text style={{ flex: 1, fontSize: 15, color: colors.normal }}>{getLabel(item)}</Text>
                    {norm(getLabel(item)) === norm(value) && (
                      <Check size={16} color={colors.primary} strokeWidth={2} />
                    )}
                  </Pressable>
                ))
              ) : (
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                  <Text style={{ fontSize: 14, color: colors.subtleDark }}>Nenhum resultado para "{query}"</Text>
                </View>
              )}
              <View style={{ height: 8 }} />
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

// ─── Tela principal ──────────────────────────────────────────────────
export default function SearchScreen() {
  const router = useRouter();
  const { fipeBrands, fipeBrandsLoading, fipeBrandsError, fetchFipeBrands } = useVehicleStore();

  const [selectedBrand, setSelectedBrand] = useState<FipeBrand | null>(null);
  const [models, setModels] = useState<FipeModel[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<FipeModel | null>(null);
  const [years, setYears] = useState<FipeYear[]>([]);
  const [yearsLoading, setYearsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<FipeYear | null>(null);
  const [versao, setVersao] = useState('');

  useEffect(() => { fetchFipeBrands(); }, []);

  useEffect(() => {
    if (!selectedBrand) { setModels([]); return; }
    setModels([]);
    setModelsLoading(true);
    fipeService.getModels(selectedBrand.codigo)
      .then(setModels)
      .catch(() => {})
      .finally(() => setModelsLoading(false));
  }, [selectedBrand]);

  useEffect(() => {
    if (!selectedBrand || !selectedModel) { setYears([]); return; }
    setYears([]);
    setYearsLoading(true);
    fipeService.getYears(selectedBrand.codigo, selectedModel.codigo)
      .then(setYears)
      .catch(() => {})
      .finally(() => setYearsLoading(false));
  }, [selectedBrand, selectedModel]);

  function clearBrand() {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setModels([]);
    setYears([]);
  }

  function clearModel() {
    setSelectedModel(null);
    setSelectedYear(null);
    setYears([]);
  }

  function handleClearAll() {
    clearBrand();
    setVersao('');
  }

  function handleSearch() {
    const params: Record<string, string> = {};
    if (selectedBrand) params.marca = selectedBrand.nome;
    if (selectedModel) params.modelo = selectedModel.nome;
    if (selectedYear) params.ano = selectedYear.codigo.split('-')[0];
    if (versao.trim()) params.versao = versao.trim();

    const qs = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');

    router.push(`/result${qs ? `?${qs}` : ''}` as never);
  }

  const hasFilter = !!(selectedBrand || selectedModel || selectedYear || versao.trim());

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F7' }} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: colors.normal }}>Buscar</Text>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            width: 40, height: 40, borderRadius: 20,
            backgroundColor: '#FFFFFF',
            alignItems: 'center', justifyContent: 'center',
            shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
          })}
        >
          <X size={20} color={colors.normal} strokeWidth={1.5} />
        </Pressable>
      </View>

      {/* Seletores */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Marca */}
        <View style={{ marginBottom: 10 }}>
          <Selector<FipeBrand>
            label="Marca"
            placeholder="Selecione a marca"
            value={selectedBrand?.nome ?? ''}
            loading={fipeBrandsLoading}
            items={fipeBrands}
            getKey={b => b.codigo}
            getLabel={b => b.nome}
            popularKeys={POPULAR_BRAND_NAMES}
            searchPlaceholder="Buscar marca…"
            onSelect={b => { setSelectedBrand(b); setSelectedModel(null); setSelectedYear(null); }}
            onClear={clearBrand}
          />
        </View>

        {/* Modelo */}
        <View style={{ marginBottom: 10 }}>
          <Selector<FipeModel>
            label="Modelo"
            placeholder={selectedBrand ? 'Selecione o modelo' : 'Selecione a marca primeiro'}
            value={selectedModel?.nome ?? ''}
            disabled={!selectedBrand}
            loading={modelsLoading}
            items={models}
            getKey={m => String(m.codigo)}
            getLabel={m => m.nome}
            searchPlaceholder="Buscar modelo…"
            onSelect={m => { setSelectedModel(m); setSelectedYear(null); }}
            onClear={clearModel}
          />
        </View>

        {/* Ano */}
        <View style={{ marginBottom: 10 }}>
          <Selector<FipeYear>
            label="Ano"
            placeholder={selectedModel ? 'Selecione o ano' : 'Selecione o modelo primeiro'}
            value={selectedYear ? selectedYear.nome : ''}
            disabled={!selectedModel}
            loading={yearsLoading}
            items={years}
            getKey={y => y.codigo}
            getLabel={y => y.nome}
            searchPlaceholder="Buscar ano…"
            onSelect={setSelectedYear}
            onClear={() => setSelectedYear(null)}
          />
        </View>

        {/* Versão */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: versao ? 'rgba(0,119,200,0.25)' : colors.background,
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.subtleDark, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6 }}>
            Versão (opcional)
          </Text>
          <TextInput
            style={{ fontSize: 16, fontWeight: '500', color: colors.normal, padding: 0 }}
            value={versao}
            onChangeText={setVersao}
            placeholder="Ex: Titanium, GT, XLS…"
            placeholderTextColor={colors.subtleLight}
          />
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colors.background,
        }}
      >
        <Pressable onPress={handleClearAll} hitSlop={8} style={{ opacity: hasFilter ? 1 : 0.3 }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: colors.subtleDark }}>Limpar tudo</Text>
        </Pressable>

        <Pressable
          onPress={handleSearch}
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.primary, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 15 }}>
            <Search size={18} color="#FFFFFF" strokeWidth={1.5} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Buscar</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
