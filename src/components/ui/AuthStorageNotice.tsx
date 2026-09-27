import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useAuthHydration, useAuthStore } from '@/src/stores/authStore';
import { colors } from '@/src/styles/tokens';

export function AuthStorageNotice() {
  const { ready, error } = useAuthHydration();
  if (ready) return null;
  return <View className="p-4 gap-3 items-center">
    {error ? <>
      <Text accessibilityRole="alert" className="text-sm text-subtle-dark text-center">{error}</Text>
      <Pressable onPress={() => void useAuthStore.persist.rehydrate()} accessibilityRole="button" className="py-3">
        <Text className="text-sm text-primary">Tentar novamente</Text>
      </Pressable>
    </> : <ActivityIndicator color={colors.primary} accessibilityLabel="Carregando conta" />}
  </View>;
}
