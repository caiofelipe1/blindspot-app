import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';

import { useToastStore } from '@/src/stores/toastStore';
import { colors } from '@/src/styles/tokens';

function ToastItem({ id, title, body }: { id: string; title: string; body: string }) {
  const dismiss = useToastStore((s) => s.dismiss);
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 18, stiffness: 200 }),
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();

    const hideTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, { toValue: -100, duration: 250, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start(() => dismiss(id));
    }, 3500);

    return () => clearTimeout(hideTimer);
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: '#19191B',
          borderRadius: 14,
          paddingVertical: 12,
          paddingHorizontal: 16,
          gap: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#FFFFFF', letterSpacing: 0.2 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 17 }}>
            {body}
          </Text>
        </View>
        <Pressable onPress={() => dismiss(id)} hitSlop={8} style={{ paddingTop: 1 }}>
          <X size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        top: insets.top + 12,
        left: 16,
        right: 16,
        gap: 8,
        zIndex: 9999,
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} />
      ))}
    </View>
  );
}
