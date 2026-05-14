export const colors = {
  primary: '#0077C8',
  normal: '#19191B',
  subtleDark: '#51565F',
  subtleLight: '#AFB1B6',
  background: '#EFEFF0',
  white: '#FFFFFF',
  muted: '#7C7D81',
} as const;

export type ColorToken = keyof typeof colors;

// Nomes exatos dos fonts após instalar @expo-google-fonts/work-sans
export const fontFamily = {
  regular: 'WorkSans_400Regular',
  medium: 'WorkSans_500Medium',
  semiBold: 'WorkSans_600SemiBold',
  bold: 'WorkSans_700Bold',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;
