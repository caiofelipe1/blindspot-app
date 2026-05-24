import { View, Text, Pressable } from 'react-native';
import { usePathname, useRouter, type Href } from 'expo-router';
import { Search, Scale, Heart, User, LogIn } from 'lucide-react-native';
import type { ComponentType } from 'react';

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
  const { isLoggedIn } = useAuthStore();

  const authTab: Tab = isLoggedIn
    ? { label: 'Perfil',  route: '/profile' as Href, Icon: User  }
    : { label: 'Entrar',  route: '/login'   as Href, Icon: LogIn };

  const tabs = [...BASE_TABS, authTab];

  return (
    <View className="h-[104px] bg-white border-t border-background pt-4 pb-[10px]">
      <View className="flex-row items-start justify-between px-8">
        {tabs.map(({ label, route, Icon }) => {
          const isActive = pathname === route;
          const iconColor = isActive ? colors.primary : colors.subtleDark;

          return (
            <Pressable
              key={String(route)}
              onPress={() => { if (!isActive) router.navigate(route); }}
              className="items-center gap-1 w-[72px]"
            >
              <Icon size={28} color={iconColor} strokeWidth={1.5} />
              <Text
                className={`text-[12px] font-medium tracking-[0.6px] ${
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
