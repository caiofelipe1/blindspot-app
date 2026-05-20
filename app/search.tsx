import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, X, ChevronDown, ChevronRight } from 'lucide-react-native';
import { colors } from '@/src/styles/tokens';

const BRAND_IMAGES: Record<string, string> = {
  Ford: 'https://www.figma.com/api/mcp/asset/030ad1a2-687e-4d27-9c1c-3658d1bd4647',
  Fiat: 'https://www.figma.com/api/mcp/asset/94d787cc-0dac-44a8-b65a-e02062362fe2',
  Volkswagen: 'https://www.figma.com/api/mcp/asset/80373e5c-640d-4f70-909a-fa4d6ec36aee',
  BYD: 'https://www.figma.com/api/mcp/asset/43041ff3-b199-4ea3-8001-b8a42d063e72',
  Hyundai: 'https://www.figma.com/api/mcp/asset/9075f7a2-c58a-4ecd-872c-5ea902a7cf15',
  Toyota: 'https://www.figma.com/api/mcp/asset/e808f934-6f33-4986-8e3b-a71311db0e2e',
  Chevrolet: 'https://www.figma.com/api/mcp/asset/cc30eb90-40ea-477a-ba35-ebe8e4d4b277',
  Renault: 'https://www.figma.com/api/mcp/asset/79e412bc-5e95-4435-8fb0-02fd3fabbc23',
};

const BRAND_ROWS = [
  ['Ford', 'Fiat', 'Volkswagen', 'BYD'],
  ['Hyundai', 'Toyota', 'Chevrolet', 'Renault'],
];

const cardShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
} as const;

interface ExpandableFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  keyboardType?: 'default' | 'numeric';
}

function ExpandableField({ label, value, onChange, keyboardType = 'default' }: ExpandableFieldProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(e => !e)}
      style={[
        {
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          paddingHorizontal: 20,
          paddingVertical: 20,
          width: '100%',
        },
        cardShadow,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: value ? colors.normal : colors.subtleDark,
            letterSpacing: 0.2,
          }}
        >
          {value || label}
        </Text>
        {expanded ? (
          <ChevronDown size={20} color={colors.subtleDark} strokeWidth={1.5} />
        ) : (
          <ChevronRight size={20} color={colors.subtleDark} strokeWidth={1.5} />
        )}
      </View>
      {expanded && (
        <TextInput
          style={{
            marginTop: 12,
            borderWidth: 1,
            borderColor: colors.subtleLight,
            borderRadius: 8,
            height: 48,
            paddingHorizontal: 16,
            fontSize: 14,
            color: colors.normal,
          }}
          value={value}
          onChangeText={onChange}
          placeholder={label}
          placeholderTextColor={colors.subtleLight}
          keyboardType={keyboardType}
          autoFocus
        />
      )}
    </Pressable>
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [versao, setVersao] = useState('');

  function handleClearAll() {
    setMarca('');
    setModelo('');
    setAno('');
    setVersao('');
  }

  function handleSearch() {
    router.push('/result' as never);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F9F9' }} edges={['top', 'bottom']}>
      {/* Close button */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 228,
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <X size={24} color={colors.normal} strokeWidth={1.5} />
        </Pressable>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 24,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* BuscaMarca card */}
        <View
          style={[
            {
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              paddingTop: 24,
              paddingHorizontal: 24,
            },
            cardShadow,
          ]}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              color: colors.normal,
              letterSpacing: 0.4,
              marginBottom: 16,
            }}
          >
            Marca
          </Text>

          {/* Search input */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.subtleLight,
              borderRadius: 8,
              height: 48,
              paddingHorizontal: 16,
              gap: 10,
            }}
          >
            <Search size={20} color={colors.subtleDark} strokeWidth={1.5} />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: colors.normal }}
              value={marca}
              onChangeText={setMarca}
              placeholder="Buscar marca"
              placeholderTextColor={colors.subtleDark}
            />
            {marca.length > 0 && (
              <Pressable onPress={() => setMarca('')} hitSlop={8}>
                <X size={16} color={colors.subtleDark} strokeWidth={1.5} />
              </Pressable>
            )}
          </View>

          <Text
            style={{
              marginTop: 16,
              fontSize: 12,
              color: colors.normal,
              letterSpacing: 0.2,
            }}
          >
            Populares
          </Text>

          {/* Brand grid — 4 per row */}
          <View style={{ marginTop: 16, gap: 24 }}>
            {BRAND_ROWS.map((row, rowIdx) => (
              <View key={rowIdx} style={{ flexDirection: 'row', gap: 8 }}>
                {row.map(brand => (
                  <Pressable
                    key={brand}
                    onPress={() => setMarca(brand)}
                    style={{ flex: 1, alignItems: 'center', gap: 8 }}
                  >
                    <Image
                      source={{ uri: BRAND_IMAGES[brand] }}
                      style={{ width: 56, height: 56 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: colors.normal,
                        letterSpacing: 0.4,
                        textAlign: 'center',
                      }}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {brand}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>

          {/* Expand indicator */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 4,
              paddingBottom: 8,
              marginTop: 8,
            }}
          >
            <ChevronDown size={20} color={colors.normal} strokeWidth={1.5} />
          </View>
        </View>

        {/* BuscaModelo */}
        <ExpandableField label="Modelo" value={modelo} onChange={setModelo} />

        {/* BuscaAno */}
        <ExpandableField label="Ano" value={ano} onChange={setAno} keyboardType="numeric" />

        {/* BuscaVersão */}
        <ExpandableField label="Versão" value={versao} onChange={setVersao} />
      </ScrollView>

      {/* Bottom bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: '#F9F9F9',
        }}
      >
        <Pressable onPress={handleClearAll} hitSlop={8}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: colors.normal,
              letterSpacing: 0.2,
            }}
          >
            Limpar tudo
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSearch}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingHorizontal: 20,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Search size={24} color="#FFFFFF" strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#FFFFFF',
              letterSpacing: 0.2,
            }}
          >
            Buscar
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
