import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { TrendingUp, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { fipeService, type FipeVehiclePrice } from '@/src/services/fipeService';
import { colors } from '@/src/styles/tokens';

interface Props {
  brand: string;
  model: string;
  year: number;
}

type State =
  | { status: 'idle' }
  | { status: 'loading'; step: string }
  | { status: 'success'; data: FipeVehiclePrice }
  | { status: 'error'; message: string };

function norm(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

export function FipePriceSection({ brand, model, year }: Props) {
  const [state, setState] = useState<State>({ status: 'idle' });

  async function consult() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setState({ status: 'loading', step: 'Buscando marcas…' });
    try {
      // 1. Find brand
      const brands = await fipeService.getBrands();
      const nb = norm(brand);
      const foundBrand =
        brands.find(b => norm(b.nome) === nb) ??
        brands.find(b => norm(b.nome).includes(nb)) ??
        brands.find(b => nb.includes(norm(b.nome)));

      if (!foundBrand) {
        setState({ status: 'error', message: `Marca "${brand}" não encontrada na tabela FIPE.` });
        return;
      }

      // 2. Find model — whole-word matching para evitar falsos positivos (ex: "polo" em "apolo")
      setState({ status: 'loading', step: 'Buscando modelos…' });
      const models = await fipeService.getModels(foundBrand.codigo);
      const nm = norm(model);
      const modelWords = nm.split(/[\s-]+/).filter(w => w.length >= 2);

      function wordScore(fipeNome: string): number {
        const fn = norm(fipeNome);
        return modelWords.filter(w => new RegExp(`(^|[\\s-])${w}([\\s-]|$)`).test(fn)).length;
      }

      const exactMatch = models.find(m => norm(m.nome) === nm);
      const minScore = Math.min(2, modelWords.length);
      const candidates = exactMatch
        ? [exactMatch]
        : models
            .map(m => ({ m, score: wordScore(m.nome) }))
            .filter(({ score }) => score >= minScore)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map(({ m }) => m);

      if (candidates.length === 0) {
        setState({ status: 'error', message: `"${model}" não encontrado na tabela FIPE. O modelo pode não estar cadastrado.` });
        return;
      }

      // 3. Testa os top candidatos até achar um com o ano correto (±3 anos)
      let bestMatch: typeof candidates[0] | null = null;
      let foundYear: Awaited<ReturnType<typeof fipeService.getYears>>[0] | null = null;

      for (const candidate of candidates) {
        setState({ status: 'loading', step: 'Buscando anos…' });
        const years = await fipeService.getYears(foundBrand.codigo, candidate.codigo);
        const match =
          years.find(y => y.codigo.startsWith(String(year))) ??
          years.find(y => {
            const fy = parseInt(y.codigo.split('-')[0], 10);
            return !isNaN(fy) && Math.abs(fy - year) <= 3;
          });
        if (match) { bestMatch = candidate; foundYear = match; break; }
      }

      if (!bestMatch || !foundYear) {
        setState({ status: 'error', message: `${model} ${year} não encontrado na tabela FIPE. O modelo pode não estar cadastrado neste ano.` });
        return;
      }

      // 4. Fetch price
      setState({ status: 'loading', step: 'Consultando preço…' });
      const price = await fipeService.getPrice(foundBrand.codigo, bestMatch.codigo, foundYear.codigo);
      setState({ status: 'success', data: price });
    } catch {
      setState({ status: 'error', message: 'Falha ao conectar com a API FIPE. Verifique sua conexão.' });
    }
  }

  function retry() {
    setState({ status: 'idle' });
  }

  if (state.status === 'idle') {
    return (
      <Pressable
        onPress={consult}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, marginHorizontal: 24, marginBottom: 20 })}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 14,
            borderRadius: 14,
            borderWidth: 1.5,
            borderColor: colors.primary,
            backgroundColor: 'rgba(0,119,200,0.05)',
          }}
        >
          <TrendingUp size={18} color={colors.primary} strokeWidth={1.5} />
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.primary }}>
            Consultar preço FIPE
          </Text>
        </View>
      </Pressable>
    );
  }

  if (state.status === 'loading') {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginHorizontal: 24,
          marginBottom: 20,
          paddingVertical: 16,
          borderRadius: 14,
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={{ fontSize: 14, color: colors.subtleDark }}>{state.step}</Text>
      </View>
    );
  }

  if (state.status === 'error') {
    return (
      <View
        style={{
          marginHorizontal: 24,
          marginBottom: 20,
          borderRadius: 14,
          backgroundColor: '#FFF1F1',
          borderWidth: 1,
          borderColor: '#FCA5A5',
          padding: 16,
          gap: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={16} color="#DC2626" strokeWidth={1.5} />
          <Text style={{ fontSize: 13, color: '#DC2626', flex: 1 }}>{state.message}</Text>
        </View>
        <Pressable
          onPress={retry}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            alignSelf: 'flex-start',
          })}
        >
          <RefreshCw size={13} color={colors.subtleDark} strokeWidth={1.5} />
          <Text style={{ fontSize: 13, fontWeight: '500', color: colors.subtleDark }}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  // success
  const { data } = state;
  return (
    <View
      style={{
        marginHorizontal: 24,
        marginBottom: 20,
        borderRadius: 14,
        backgroundColor: '#EBF4FC',
        borderWidth: 1,
        borderColor: 'rgba(0,119,200,0.2)',
        padding: 16,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <CheckCircle2 size={16} color={colors.primary} strokeWidth={1.5} />
        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          Tabela FIPE
        </Text>
      </View>

      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: colors.normal }}>{data.Valor}</Text>
        <Text style={{ fontSize: 13, color: colors.subtleDark }}>
          {data.Marca} {data.Modelo} · {data.AnoModelo}
        </Text>
        <Text style={{ fontSize: 12, color: colors.subtleLight }}>
          Referência: {data.MesReferencia} · {data.Combustivel}
        </Text>
      </View>

      <Pressable
        onPress={retry}
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          alignSelf: 'flex-start',
        })}
      >
        <RefreshCw size={12} color={colors.subtleDark} strokeWidth={1.5} />
        <Text style={{ fontSize: 12, color: colors.subtleDark }}>Atualizar</Text>
      </Pressable>
    </View>
  );
}
