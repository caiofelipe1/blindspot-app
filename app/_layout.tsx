import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ToastContainer } from '@/src/components/ui/Toast';

const LOGO = require('../assets/images/splash-icon.png');

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [splashDone, setSplashDone] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => setSplashDone(true));
    }, 900);

    return () => clearTimeout(timer);
  }, []);

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
      <ToastContainer />

      {/* Loading overlay com logo — visível até o app estar pronto */}
      {!splashDone && (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#1A1A1A',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: fadeAnim,
          }}
        >
          <Image
            source={LOGO}
            style={{ width: 180, height: 180 }}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </ThemeProvider>
  );
}
