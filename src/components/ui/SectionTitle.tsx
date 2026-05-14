import { View, Text } from 'react-native';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const titleSizeClass: Record<NonNullable<SectionTitleProps['size']>, string> = {
  sm: 'text-base font-semibold text-normal',
  md: 'text-xl font-semibold text-normal',
  lg: 'text-[32px] font-medium text-normal leading-[41px]',
};

export function SectionTitle({ title, subtitle, size = 'md', className = '' }: SectionTitleProps) {
  return (
    <View className={`gap-1 ${className}`}>
      <Text className={titleSizeClass[size]}>{title}</Text>
      {subtitle && (
        <Text className="text-subtle-dark text-base leading-8">{subtitle}</Text>
      )}
    </View>
  );
}
