import { useState, type ReactNode } from 'react';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft, Share2, Trophy, ChevronDown, ChevronUp,
  ChevronsUp, ChevronsDown, Zap, Settings2, Fuel, Ruler, Tag, Star,
} from 'lucide-react-native';

import { colors } from '@/src/styles/tokens';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { useComparisonStore } from '@/src/stores/comparisonStore';
import { ALL_VEHICLES } from '@/src/data/vehicles.mock';
import type { VehicleMock } from '@/src/data/vehicles.mock';

// ─── helpers ────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

type WinDir = 'higher' | 'lower' | 'none';
type WinResult = 'left' | 'right' | 'tie' | 'none';

function parseNum(str: string | undefined): number | null {
  if (!str || str === 'Não disponível') return null;
  const clean = str.replace(',', '.');
  const m = clean.match(/[\d.]+/);
  if (!m) return null;
  const n = parseFloat(m[0]);
  return isNaN(n) ? null : n;
}

function calcWinner(
  lVal: string,
  rVal: string,
  dir: WinDir,
  lNum?: number,
  rNum?: number,
): WinResult {
  if (dir === 'none') return 'none';
  const l = lNum ?? parseNum(lVal);
  const r = rNum ?? parseNum(rVal);
  if (l === null || r === null) return 'none';
  if (l === r) return 'tie';
  if (dir === 'higher') return l > r ? 'left' : 'right';
  return l < r ? 'left' : 'right';
}

// ─── data model ─────────────────────────────────────────────────────────────

interface SpecRow {
  label: string;
  leftVal: string;
  rightVal: string;
  win: WinResult;
}

interface Section {
  id: string;
  title: string;
  rows: SpecRow[];
}

function buildSections(lv: VehicleMock, rv: VehicleMock): Section[] {
  function row(
    label: string,
    getDisp: (v: VehicleMock) => string | undefined,
    dir: WinDir,
    getNum?: (v: VehicleMock) => number | undefined,
  ): SpecRow {
    const lVal = getDisp(lv) ?? 'Não disponível';
    const rVal = getDisp(rv) ?? 'Não disponível';
    return {
      label,
      leftVal: lVal,
      rightVal: rVal,
      win: calcWinner(lVal, rVal, dir, getNum?.(lv), getNum?.(rv)),
    };
  }

  return [
    {
      id: 'motor', title: 'Motor', rows: [
        row('Tipo', v => v.engineType, 'none'),
        row('Potência', v => v.power, 'higher'),
        row('Torque', v => v.torque, 'higher'),
        row('Combustível', v => v.fuel, 'none'),
      ],
    },
    {
      id: 'transmission', title: 'Transmissão', rows: [
        row('Câmbio', v => v.transmission, 'none'),
        row('Tração', v => v.traction, 'none'),
      ],
    },
    {
      id: 'performance', title: 'Desempenho', rows: [
        row('Consumo urbano', v => v.urbanConsumption, 'higher'),
        row('Consumo rodoviário', v => v.highwayConsumption, 'higher'),
        row('0–100 km/h', v => v.acceleration, 'lower'),
        row('Vel. máxima', v => v.topSpeed, 'higher'),
      ],
    },
    {
      id: 'dimensions', title: 'Dimensões', rows: [
        row('Comprimento', v => v.dimensions ? `${v.dimensions.comprimento.toLocaleString('pt-BR')} mm` : undefined, 'none'),
        row('Largura', v => v.dimensions ? `${v.dimensions.largura.toLocaleString('pt-BR')} mm` : undefined, 'none'),
        row('Altura', v => v.dimensions ? `${v.dimensions.altura.toLocaleString('pt-BR')} mm` : undefined, 'none'),
        row('Entre-eixos', v => v.dimensions ? `${v.dimensions.entre_eixos.toLocaleString('pt-BR')} mm` : undefined, 'none'),
        row('Porta-malas', v => v.dimensions ? `${v.dimensions.portaMalas} L` : undefined, 'higher',
          v => v.dimensions?.portaMalas),
        row('Peso', v => v.weight ? `${v.weight.toLocaleString('pt-BR')} kg` : undefined, 'lower',
          v => v.weight),
      ],
    },
    {
      id: 'price', title: 'Preço e Avaliação', rows: [
        row('Preço aprox.', v => formatPrice(v.price), 'lower', v => v.price),
        row('Avaliação', v => `${v.rating}`, 'higher', v => v.rating),
      ],
    },
  ];
}

function computeWins(sections: Section[]): { leftWins: number; rightWins: number } {
  let l = 0, r = 0;
  for (const s of sections) {
    for (const row of s.rows) {
      if (row.win === 'left') l++;
      else if (row.win === 'right') r++;
    }
  }
  return { leftWins: l, rightWins: r };
}

// ─── sub-components ──────────────────────────────────────────────────────────

function getSectionIcon(id: string): ReactNode {
  const p = { size: 18, color: colors.primary, strokeWidth: 1.5 };
  switch (id) {
    case 'motor':        return <Zap {...p} />;
    case 'transmission': return <Settings2 {...p} />;
    case 'performance':  return <Fuel {...p} />;
    case 'dimensions':   return <Ruler {...p} />;
    default:             return <Tag {...p} />;
  }
}

function CompareRow({ label, leftVal, rightVal, win, isLast }: {
  label: string;
  leftVal: string;
  rightVal: string;
  win: WinResult;
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: '#F7F8F9',
        paddingVertical: 14,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: '#ECEDF0',
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: colors.subtleDark,
          textAlign: 'center',
          marginBottom: 8,
          letterSpacing: 0.2,
        }}
      >
        {label}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: win === 'left' ? '700' : '400',
              color: win === 'left' ? colors.normal : colors.subtleDark,
              textAlign: 'center',
            }}
            numberOfLines={3}
          >
            {leftVal}
          </Text>
        </View>
        <View style={{ width: 1, backgroundColor: '#DDDFE3' }} />
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: win === 'right' ? '700' : '400',
              color: win === 'right' ? colors.normal : colors.subtleDark,
              textAlign: 'center',
            }}
            numberOfLines={3}
          >
            {rightVal}
          </Text>
        </View>
      </View>
    </View>
  );
}

function CompareSection({ section, expanded, onToggle }: {
  section: Section;
  expanded: boolean;
  onToggle: () => void;
}) {
  const icon = getSectionIcon(section.id);

  return (
    <View style={{ backgroundColor: '#FFFFFF' }}>
      <Pressable
        onPress={onToggle}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
          gap: 12,
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: 'rgba(0,119,200,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>
        <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: colors.normal, letterSpacing: 0.2 }}>
          {section.title}
        </Text>
        {expanded
          ? <ChevronUp size={20} color={colors.subtleDark} strokeWidth={1.5} />
          : <ChevronDown size={20} color={colors.subtleDark} strokeWidth={1.5} />
        }
      </Pressable>

      {expanded && section.rows.map((r, i) => (
        <CompareRow
          key={r.label}
          label={r.label}
          leftVal={r.leftVal}
          rightVal={r.rightVal}
          win={r.win}
          isLast={i === section.rows.length - 1}
        />
      ))}
    </View>
  );
}

function VehicleHeader({ vehicle, onPress }: { vehicle: VehicleMock; onPress: () => void }) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      <Image
        source={vehicle.image}
        style={{ width: '100%', height: 170 }}
        resizeMode="cover"
      />
      <View style={{ padding: 12, gap: 5 }}>
        <Text
          style={{ fontSize: 15, fontWeight: '700', color: colors.normal, letterSpacing: 0.2 }}
          numberOfLines={2}
        >
          {vehicle.brand} {vehicle.model}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Star size={12} color="#FE9A00" fill="#FE9A00" />
          <Text style={{ fontSize: 12, fontWeight: '600', color: colors.normal }}>
            {vehicle.rating}
          </Text>
          <Text style={{ fontSize: 11, color: colors.subtleDark }}>
            ({Math.round(vehicle.rating * 26)} avaliações)
          </Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.normal }}>
          {formatPrice(vehicle.price)}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── screen ──────────────────────────────────────────────────────────────────

const ALL_SECTION_IDS = ['motor', 'transmission', 'performance', 'dimensions', 'price'];

export default function ComparisonScreen() {
  const router = useRouter();
  const { selectedIds } = useComparisonStore();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(ALL_SECTION_IDS)
  );

  const vehicles = selectedIds
    .map(id => ALL_VEHICLES.find(v => v.id === id))
    .filter((v): v is VehicleMock => !!v);

  if (vehicles.length < 2) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, paddingHorizontal: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.normal, textAlign: 'center' }}>
            Selecione pelo menos 2 veículos para comparar
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
        <BottomNav />
      </SafeAreaView>
    );
  }

  const [leftV, rightV] = vehicles;
  const sections = buildSections(leftV, rightV);
  const { leftWins, rightWins } = computeWins(sections);
  const allExpanded = expandedSections.size === sections.length;

  function toggleSection(id: string) {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setExpandedSections(
      allExpanded ? new Set() : new Set(ALL_SECTION_IDS)
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
      {/* ── Header ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={20} color={colors.normal} strokeWidth={1.5} />
        </Pressable>

        <View style={{ flex: 1 }} />

        <Pressable
          hitSlop={8}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Share2 size={20} color={colors.normal} strokeWidth={1.5} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* ── Vehicle Cards (side-by-side) ── */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: colors.background,
          }}
        >
          <VehicleHeader
            vehicle={leftV}
            onPress={() => router.push(`/vehicle/${leftV.id}` as never)}
          />
          <View style={{ width: 1, backgroundColor: colors.background }} />
          <VehicleHeader
            vehicle={rightV}
            onPress={() => router.push(`/vehicle/${rightV.id}` as never)}
          />
        </View>

        {/* ── Winner Stats ── */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: colors.background,
          }}
        >
          {/* Left winner */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <Trophy size={22} color="#F59E0B" strokeWidth={1.5} />
            <View>
              <Text style={{ fontSize: 12, color: colors.subtleDark, marginBottom: 2 }}>
                {leftV.model} vence
              </Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.normal }}>
                {leftWins} Specs
              </Text>
            </View>
          </View>

          <View style={{ width: 1, backgroundColor: colors.background }} />

          {/* Right winner */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 14,
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: colors.subtleDark, marginBottom: 2 }}>
              {rightV.model} vence
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.normal }}>
              {rightWins} Specs
            </Text>
          </View>
        </View>

        {/* ── Collapse / Expand all ── */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.background,
          }}
        >
          <Pressable
            onPress={toggleAll}
            hitSlop={8}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            {allExpanded
              ? <ChevronsUp size={16} color={colors.primary} strokeWidth={1.5} />
              : <ChevronsDown size={16} color={colors.primary} strokeWidth={1.5} />
            }
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>
              {allExpanded ? 'Colapsar tudo' : 'Expandir tudo'}
            </Text>
          </Pressable>
        </View>

        {/* ── Spec Sections ── */}
        <View style={{ gap: 1, backgroundColor: colors.background }}>
          {sections.map(section => (
            <CompareSection
              key={section.id}
              section={section}
              expanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}
