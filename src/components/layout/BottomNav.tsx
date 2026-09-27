import { View, Text, Pressable } from 'react-native';
import { usePathname, useRouter, type Href } from 'expo-router';
import { Search, Scale, Heart, User, LogIn } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import type { ComponentType } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/src/styles/tokens';
import { useAuthStore } from '@/src/stores/authStore';

interface Tab {
  label: string;
  route: Href;
  Icon: ComponentType<{ size: number; color: string; strokeWidth?: number }>;
}

const BASE_TABS: Tab[] = [
  { label: 'Explorar',  route: '/explore'    as Href, Icon: Search },
  { label: 'Comparar',  route: '/comparison' as Href, Icon: Scale  },
  { label: 'Favoritos', route: '/favorites'  as Href, Icon: Heart  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isLoggedIn } = useAuthStore();

  const authTab: Tab = isLoggedIn
    ? { label: 'Perfil',  route: '/profile' as Href, Icon: User  }
    : { label: 'Entrar',  route: '/login'   as Href, Icon: LogIn };

  const tabs = [...BASE_TABS, authTab];

  return (
    <View className="bg-white border-t border-background pt-2" style={{ paddingBottom: Math.max(10, insets.bottom), paddingLeft: insets.left, paddingRight: insets.right }}>
      <View className="flex-row items-start px-2">
        {tabs.map(({ label, route, Icon }) => {
          const isActive = pathname === route
            || (route === '/explore' && ['/search', '/result'].includes(pathname))
            || (route === '/favorites' && pathname === '/recently-viewed');
          const iconColor = isActive ? colors.primary : colors.subtleDark;

          return (
            <Pressable
              key={String(route)}
              onPress={() => {
                if (pathname !== route) {
                  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  router.navigate(route);
                }
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={label}
              className="items-center gap-1 flex-1 py-2 px-1"
            >
              <Icon size={28} color={iconColor} strokeWidth={1.5} />
              <Text
                className={`text-[12px] text-center font-medium tracking-[0.6px] ${
                  isActive ? 'text-primary' : 'text-subtle-dark'
                }`}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
