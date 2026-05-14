import { Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'sm';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantStyles: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: 'bg-primary',
    text: 'text-white',
  },
  secondary: {
    container: 'bg-white border border-subtle-dark',
    text: 'text-normal',
  },
};

const sizeStyles: Record<Size, { container: string; text: string }> = {
  md: { container: 'h-[60px] rounded-2xl px-5', text: 'text-xl font-semibold' },
  sm: { container: 'h-[48px] rounded-xl px-4', text: 'text-base font-semibold' },
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <Pressable
      disabled={disabled}
      className={`items-center justify-center ${v.container} ${s.container} ${disabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      <Text className={`${v.text} ${s.text}`}>{label}</Text>
    </Pressable>
  );
}
