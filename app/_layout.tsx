import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Telas raiz — fade para parecer troca de aba, sem slide */}
        <Stack.Screen name="index"      options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="explore"    options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="comparison" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="favorites"  options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="profile"    options={{ headerShown: false, animation: 'fade' }} />

        {/* Telas de fluxo — slide padrão */}
        <Stack.Screen name="login"          options={{ headerShown: false }} />
        <Stack.Screen name="register"       options={{ headerShown: false }} />
        <Stack.Screen name="register-info"  options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
        <Stack.Screen name="search"         options={{ headerShown: false }} />
        <Stack.Screen name="result"         options={{ headerShown: false }} />
        <Stack.Screen name="vehicle/[id]"   options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
