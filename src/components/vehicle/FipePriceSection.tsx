import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SearchSelect } from '@/src/components/ui/SearchSelect';
import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/styles/tokens';
import { useFipeLookup } from '@/src/utils/useFipeLookup';
import { fipeConsultedDate } from '@/src/utils/savedFipe';

interface Props { id: string; brand: string; model: string; version: string; year: number }

export function FipePriceSection(props: Props) {
  // Reset selections and invalidate pending requests when navigating to another vehicle.
  return <FipeLookup key={`${props.id}:${props.brand}:${props.model}:${props.version}:${props.year}`} {...props} />;
}

function FipeLookup(props: Props) {
  const { brand, model, year } = props;
  const lookup = useFipeLookup(props);
  const saved = lookup.saved;
  if (!lookup.hydrated) return <View className="mx-6 mb-5">
    {lookup.hydrationError ? <Pressable onPress={() => void lookup.hydrate()} accessibilityRole="button" className="py-3">
      <Text className="text-sm text-subtle-dark">{lookup.hydrationError}</Text>
      <Text className="text-sm text-primary">Tentar novamente</Text>
    </Pressable> : <ActivityIndicator color={colors.primary} accessibilityLabel="Carregando consulta salva" />}
  </View>;
  if (!lookup.started && !saved && !lookup.error) {
    return <View className="mx-6 mb-5"><Button label="Consultar preço FIPE" variant="secondary" onPress={lookup.start} /></View>;
  }
  return (
    <View className="mx-6 mb-5 p-4 rounded-2xl bg-background gap-3">
      <Text className="text-base font-semibold text-primary">Consulta FIPE</Text>
      {saved && <View className="gap-2">
        <Text className="text-xs text-subtle-dark">ÚLTIMA CONSULTA SALVA</Text>
        <Text className="text-2xl font-bold text-normal">{saved.price.Valor}</Text>
        <Text className="text-sm text-normal">{saved.price.Modelo}</Text>
        <Text className="text-sm text-subtle-dark">{saved.price.AnoModelo} · {saved.price.Combustivel}</Text>
        <Text className="text-xs text-subtle-dark">Referência: {saved.price.MesReferencia} · FIPE {saved.price.CodigoFipe}</Text>
        <Text className="text-xs text-subtle-dark">Consultado em {fipeConsultedDate(saved)} · disponível na comparação</Text>
        {!lookup.started && <View className="gap-1">
          <Button size="sm" label="Atualizar preço" variant="secondary" onPress={lookup.refresh} disabled={lookup.loading} />
          <View className="flex-row flex-wrap justify-between gap-3">
            <Pressable onPress={lookup.start} disabled={lookup.loading} accessibilityRole="button" className="py-3"><Text className="text-sm text-primary">Alterar versão</Text></Pressable>
            <Pressable onPress={lookup.remove} disabled={lookup.loading} accessibilityRole="button" className="py-3"><Text className="text-sm text-subtle-dark">Remover consulta</Text></Pressable>
          </View>
        </View>}
      </View>}
      {lookup.started && <>
      <Text className="text-sm text-subtle-dark">Confira a versão de {brand} {model} e o combustível para {year}. A seleção confirmada será salva para comparar preços.</Text>
      {lookup.models.length > 0 && <>
      <SearchSelect label="Modelo e versão na FIPE" value={String(lookup.model?.codigo ?? '')} options={lookup.models.map(m => ({ value: String(m.codigo), label: m.nome }))}
        disabled={lookup.loading || !lookup.brand} onChange={value => lookup.selectModel(lookup.models.find(m => String(m.codigo) === value) ?? null)} />
      <SearchSelect label="Ano e combustível na FIPE" value={lookup.year?.codigo ?? ''} options={lookup.years.map(y => ({ value: y.codigo, label: y.nome }))}
        disabled={lookup.loading || !lookup.model || lookup.years.length === 0} onChange={value => lookup.selectYear(lookup.years.find(y => y.codigo === value) ?? null)} />
      </>}
      </>}
      {lookup.loading && <View className="flex-row items-center gap-2 py-2"><ActivityIndicator color={colors.primary} /><Text className="text-sm text-subtle-dark">Consultando FIPE…</Text></View>}
      {lookup.started && !lookup.loading && !lookup.error && lookup.models.length === 0 && <View className="gap-2">
        <Text accessibilityRole="alert" className="text-sm text-subtle-dark">Não encontramos versões de {brand} {model} para {year} na FIPE. O preço FIPE está indisponível para esta ficha.</Text>
        <Pressable onPress={lookup.start} accessibilityRole="button" className="py-2"><Text className="font-semibold text-primary">Verificar novamente</Text></Pressable>
      </View>}
      {lookup.error && <View className="gap-2">
        <Text accessibilityRole="alert" className="text-sm text-subtle-dark">{lookup.error.message}</Text>
        <Pressable onPress={lookup.error.retry} accessibilityRole="button" className="py-3"><Text className="font-semibold text-primary">Tentar novamente</Text></Pressable>
      </View>}
      {lookup.started && lookup.models.length > 0 && <Button size="sm" label="Confirmar e salvar consulta" onPress={lookup.consult} disabled={lookup.loading || !lookup.year} />}
      {lookup.started && <Pressable onPress={lookup.cancel} disabled={lookup.loading} accessibilityRole="button" className="py-2 self-start"><Text className="text-sm text-subtle-dark">Cancelar</Text></Pressable>}
    </View>
  );
}
