import { View, Text, Pressable } from 'react-native';
import { usePathname, useRouter, type Href } from 'expo-router';
import { Search, Scale, Heart, User } from 'lucide-react-native';
import type { ComponentType } from 'react';

import { colors } from '@/src/styles/tokens';

interface Tab {
  label: string;
  route: Href;
  Icon: ComponentType<{ size: number; color: string; strokeWidth?: number }>;
}

const TABS: Tab[] = [
  { label: 'Explorar',  route: '/explore'    as Href, Icon: Search },
  // TODO: criar rota /comparison
  { label: 'Comparar',  route: '/comparison' as Href, Icon: Scale  },
  // TODO: criar rota /favorites
  { label: 'Favoritos', route: '/favorites'  as Href, Icon: Heart  },
  { label: 'Entrar',    route: '/login'      as Href, Icon: User   },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="h-[104px] bg-white border-t border-background pt-4 pb-[10px]">
      <View className="flex-row items-start justify-between px-8">
        {TABS.map(({ label, route, Icon }) => {
          const isActive = pathname === route;
          const iconColor = isActive ? colors.primary : colors.subtleDark;

          return (
            <Pressable
              key={String(route)}
              onPress={() => router.push(route)}
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
