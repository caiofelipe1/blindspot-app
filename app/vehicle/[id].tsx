import { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft, Heart, Zap, Fuel, Settings2,
  Ruler, Shield, Tag, Info, CheckCircle2, Car,
} from 'lucide-react-native';
import type { ReactNode } from 'react';

import { colors } from '@/src/styles/tokens';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { CollapsibleSection } from '@/src/components/vehicle/CollapsibleSection';
import { SpecRow } from '@/src/components/vehicle/SpecRow';
import { ALL_VEHICLES } from '@/src/data/vehicles.mock';

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

function SummaryPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(0,119,200,0.07)',
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderWidth: 1,
        borderColor: 'rgba(0,119,200,0.12)',
      }}
    >
      {icon}
      <Text style={{ fontSize: 13, fontWeight: '500', color: colors.normal }}>{label}</Text>
    </View>
  );
}

export default function VehicleDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [favorited, setFavorited] = useState(false);

  const vehicle = ALL_VEHICLES.find(v => v.id === id);

  if (!vehicle) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.normal, textAlign: 'center' }}>
            Veículo não encontrado
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={{
              borderWidth: 1,
              borderColor: colors.subtleLight,
              borderRadius: 12,
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.normal }}>Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const hasDimensions = !!vehicle.dimensions;
  const hasPerformance = !!(vehicle.urbanConsumption || vehicle.acceleration);
  const hasSafety = !!(vehicle.safetyFeatures && vehicle.safetyFeatures.length > 0);
  const hasOtherAttrs = !!(vehicle.otherAttributes && vehicle.otherAttributes.length > 0);
  const hasSources = !!(vehicle.dataSources && vehicle.dataSources.length > 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
      {/* ── Header ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: 12,
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.background,
        }}
      >
        <Pressable
          onPress={() => router.back()}
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

        <Text
          style={{ flex: 1, fontSize: 18, fontWeight: '600', color: colors.normal, letterSpacing: 0.4 }}
          numberOfLines={1}
        >
          Ficha Técnica
        </Text>

        <Pressable
          onPress={() => setFavorited(f => !f)}
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
          <Heart
            size={20}
            color={favorited ? '#E53E3E' : colors.subtleDark}
            fill={favorited ? '#E53E3E' : 'transparent'}
            strokeWidth={1.5}
          />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* ── Hero Image ── */}
        <View style={{ width: '100%', height: 230, backgroundColor: colors.background }}>
          <Image
            source={vehicle.image}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          {vehicle.isElectric && (
            <View
              style={{
                position: 'absolute',
                bottom: 12,
                right: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                backgroundColor: 'rgba(0,0,0,0.55)',
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Zap size={12} color="#4ADE80" fill="#4ADE80" strokeWidth={1.5} />
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#4ADE80' }}>Elétrico</Text>
            </View>
          )}
        </View>

        {/* ── Identity Section ── */}
        <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16, gap: 10 }}>
          {/* Chips: Marca + Ano + Confiabilidade */}
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <View
              style={{
                backgroundColor: 'rgba(0,119,200,0.08)',
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary }}>{vehicle.brand}</Text>
            </View>

            <View
              style={{
                backgroundColor: colors.background,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '500', color: colors.subtleDark }}>{vehicle.year}</Text>
            </View>

            {vehicle.confidenceStatus && (
              <StatusBadge status={vehicle.confidenceStatus} />
            )}
          </View>

          {/* Modelo */}
          <Text style={{ fontSize: 26, fontWeight: '700', color: colors.normal, letterSpacing: 0.2, lineHeight: 32 }}>
            {vehicle.model}
          </Text>

          {/* Versão */}
          <Text style={{ fontSize: 14, color: colors.subtleDark, letterSpacing: 0.2 }}>
            {vehicle.version}
          </Text>

          {/* Preço */}
          <Text style={{ fontSize: 22, fontWeight: '700', color: colors.primary, letterSpacing: 0.2 }}>
            {formatPrice(vehicle.price)}
          </Text>
        </View>

        {/* ── Summary Pills (scroll horizontal) ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8, paddingBottom: 20 }}
        >
          <SummaryPill
            icon={<Zap size={14} color={colors.primary} strokeWidth={1.5} />}
            label={vehicle.power}
          />
          <SummaryPill
            icon={<Fuel size={14} color={colors.primary} strokeWidth={1.5} />}
            label={vehicle.fuel}
          />
          <SummaryPill
            icon={<Settings2 size={14} color={colors.primary} strokeWidth={1.5} />}
            label={vehicle.transmission}
          />
          {vehicle.traction && (
            <SummaryPill
              icon={<Car size={14} color={colors.primary} strokeWidth={1.5} />}
              label={vehicle.traction}
            />
          )}
        </ScrollView>

        {/* ── Divider ── */}
        <View
          style={{ height: 1, backgroundColor: colors.background, marginHorizontal: 24, marginBottom: 20 }}
        />

        {/* ── Spec Sections ── */}
        <View style={{ paddingHorizontal: 16, gap: 12, paddingBottom: 20 }}>

          {/* Motor */}
          <CollapsibleSection
            title="Motor"
            icon={<Zap size={18} color={colors.primary} strokeWidth={1.5} />}
            defaultExpanded
          >
            <SpecRow label="Potência" value={vehicle.power} />
            {vehicle.torque && <SpecRow label="Torque" value={vehicle.torque} />}
            {vehicle.engineType && <SpecRow label="Tipo de motor" value={vehicle.engineType} />}
            <SpecRow label="Combustível" value={vehicle.fuel} isLast />
          </CollapsibleSection>

          {/* Transmissão */}
          <CollapsibleSection
            title="Transmissão"
            icon={<Settings2 size={18} color={colors.primary} strokeWidth={1.5} />}
          >
            <SpecRow label="Câmbio" value={vehicle.transmission} />
            <SpecRow
              label="Tração"
              value={vehicle.traction ?? '–'}
              isLast
            />
          </CollapsibleSection>

          {/* Desempenho */}
          {hasPerformance && (
            <CollapsibleSection
              title="Desempenho"
              icon={<Fuel size={18} color={colors.primary} strokeWidth={1.5} />}
            >
              {vehicle.urbanConsumption && (
                <SpecRow label="Consumo urbano" value={vehicle.urbanConsumption} />
              )}
              {vehicle.highwayConsumption && (
                <SpecRow label="Consumo rodoviário" value={vehicle.highwayConsumption} />
              )}
              {vehicle.acceleration && (
                <SpecRow label="0–100 km/h" value={vehicle.acceleration} />
              )}
              <SpecRow
                label="Vel. máxima"
                value={vehicle.topSpeed ?? '–'}
                isLast
              />
            </CollapsibleSection>
          )}

          {/* Dimensões */}
          {hasDimensions && (
            <CollapsibleSection
              title="Dimensões"
              icon={<Ruler size={18} color={colors.primary} strokeWidth={1.5} />}
            >
              <SpecRow
                label="Comprimento"
                value={`${vehicle.dimensions!.comprimento.toLocaleString('pt-BR')} mm`}
              />
              <SpecRow
                label="Largura"
                value={`${vehicle.dimensions!.largura.toLocaleString('pt-BR')} mm`}
              />
              <SpecRow
                label="Altura"
                value={`${vehicle.dimensions!.altura.toLocaleString('pt-BR')} mm`}
              />
              <SpecRow
                label="Entre-eixos"
                value={`${vehicle.dimensions!.entre_eixos.toLocaleString('pt-BR')} mm`}
              />
              <SpecRow
                label="Porta-malas"
                value={`${vehicle.dimensions!.portaMalas} L`}
              />
              <SpecRow
                label="Peso"
                value={vehicle.weight ? `${vehicle.weight.toLocaleString('pt-BR')} kg` : '–'}
                isLast
              />
            </CollapsibleSection>
          )}

          {/* Segurança */}
          {hasSafety && (
            <CollapsibleSection
              title="Segurança"
              icon={<Shield size={18} color={colors.primary} strokeWidth={1.5} />}
            >
              {vehicle.safetyFeatures!.map((feature, index) => (
                <SpecRow
                  key={feature}
                  label={feature}
                  value="✓"
                  isLast={index === vehicle.safetyFeatures!.length - 1}
                />
              ))}
            </CollapsibleSection>
          )}

          {/* Outros atributos */}
          {hasOtherAttrs && (
            <CollapsibleSection
              title="Outros atributos"
              icon={<Tag size={18} color={colors.primary} strokeWidth={1.5} />}
            >
              {vehicle.otherAttributes!.map((attr, index) => (
                <SpecRow
                  key={attr.label}
                  label={attr.label}
                  value={attr.value}
                  isLast={index === vehicle.otherAttributes!.length - 1}
                />
              ))}
            </CollapsibleSection>
          )}
        </View>

        {/* ── Fontes de dados ── */}
        {hasSources && (
          <View style={{ paddingHorizontal: 24, paddingBottom: 48 }}>
            <View style={{ height: 1, backgroundColor: colors.background, marginBottom: 20 }} />

            <Text
              style={{ fontSize: 16, fontWeight: '600', color: colors.normal, marginBottom: 14, letterSpacing: 0.2 }}
            >
              Fontes de dados
            </Text>

            <View style={{ gap: 10 }}>
              {vehicle.dataSources!.map(source => (
                <View key={source} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={14} color={colors.primary} strokeWidth={1.5} />
                  <Text style={{ fontSize: 13, color: colors.subtleDark }}>{source}</Text>
                </View>
              ))}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
                marginTop: 16,
                backgroundColor: colors.background,
                borderRadius: 12,
                padding: 14,
              }}
            >
              <Info size={14} color={colors.muted} strokeWidth={1.5} style={{ marginTop: 1 }} />
              <Text style={{ fontSize: 12, color: colors.muted, flex: 1, lineHeight: 18 }}>
                Dados obtidos de fontes públicas e fabricantes. Verifique as especificações oficiais antes de tomar decisões de compra.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
