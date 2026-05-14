import { View, Text } from 'react-native';
import type { Vehicle } from '@/src/types/vehicle';

type Confiabilidade = Vehicle['confiabilidade'];

interface StatusBadgeProps {
  status: Confiabilidade;
}

const config: Record<Confiabilidade, { label: string; bg: string; text: string }> = {
  verificado: {
    label: 'Verificado',
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  parcial: {
    label: 'Parcial',
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
  },
  nao_verificado: {
    label: 'Não verificado',
    bg: 'bg-red-100',
    text: 'text-red-500',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, bg, text } = config[status];
  return (
    <View className={`px-3 py-1 rounded-full self-start ${bg}`}>
      <Text className={`text-xs font-medium ${text}`}>{label}</Text>
    </View>
  );
}
