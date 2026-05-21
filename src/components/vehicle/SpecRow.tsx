import { View, Text } from 'react-native';
import { colors } from '@/src/styles/tokens';

interface SpecRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

export function SpecRow({ label, value, isLast = false }: SpecRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 13,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.background,
        gap: 16,
      }}
    >
      <Text
        style={{ fontSize: 14, color: colors.subtleDark, flex: 1 }}
        numberOfLines={2}
      >
        {label}
      </Text>
      <Text
        style={{ fontSize: 14, fontWeight: '500', color: colors.normal, textAlign: 'right', flexShrink: 1 }}
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}
