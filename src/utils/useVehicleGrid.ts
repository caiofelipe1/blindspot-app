import { useWindowDimensions } from 'react-native';

export function useVehicleGrid() {
  const { width, fontScale } = useWindowDimensions();
  const columns = width < 340 || fontScale > 1.25 ? 1 : 2;
  const gap = 16;
  return { columns, gap, cardWidth: Math.max(1, (width - 32 - gap * (columns - 1)) / columns) };
}
