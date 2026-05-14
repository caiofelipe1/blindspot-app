import { View, Pressable, type PressableProps, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

interface AppCardProps {
  children: ReactNode;
  onPress?: PressableProps['onPress'];
  className?: string;
  contentClassName?: string;
}

export function AppCard({ children, onPress, className = '', contentClassName = '' }: AppCardProps) {
  const base = `bg-white rounded-2xl overflow-hidden ${className}`;
  const inner = `p-4 ${contentClassName}`;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={base}
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 }}
      >
        <View className={inner}>{children}</View>
      </Pressable>
    );
  }

  return (
    <View
      className={base}
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 }}
    >
      <View className={inner}>{children}</View>
    </View>
  );
}
