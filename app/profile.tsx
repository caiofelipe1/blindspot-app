import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Heart, LogOut, Info, ChevronRight, Star } from 'lucide-react-native';

import { BottomNav } from '@/src/components/layout/BottomNav';
import { useAuthStore } from '@/src/stores/authStore';
import { useFavoritesStore } from '@/src/stores/favoritesStore';
import { colors } from '@/src/styles/tokens';

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

interface MenuRowProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  onPress?: () => void;
  isLast?: boolean;
}

function MenuRow({ icon, iconBg, label, onPress, isLast }: MenuRowProps) {
  return (
    <>
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 20,
            gap: 14,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: iconBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </View>

          <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: colors.normal }}>
            {label}
          </Text>

          <ChevronRight size={18} color={colors.subtleLight} strokeWidth={1.5} />
        </View>
      </Pressable>

      {!isLast && (
        <View style={{ height: 1, backgroundColor: colors.background, marginLeft: 70 }} />
      )}
    </>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { favoriteIds } = useFavoritesStore();

  function handleLogout() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/');
          },
        },
      ],
    );
  }

  if (!user) {
    router.replace('/login');
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Título */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: '600', color: colors.normal }}>Perfil</Text>
        </View>

        {/* Avatar + dados */}
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 28,
            marginHorizontal: 24,
            borderRadius: 20,
            backgroundColor: colors.background,
            gap: 12,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: '700', color: colors.white }}>
              {getInitials(user.name)}
            </Text>
          </View>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: colors.normal }}>
              {user.name}
            </Text>
            <Text style={{ fontSize: 14, color: colors.subtleDark }}>{user.email}</Text>
          </View>
        </View>

        {/* Estatísticas */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 24,
            marginTop: 16,
            borderRadius: 16,
            backgroundColor: colors.background,
            overflow: 'hidden',
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', paddingVertical: 16, gap: 4 }}>
            <Heart size={20} color={colors.primary} strokeWidth={1.5} />
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.normal }}>
              {favoriteIds.length}
            </Text>
            <Text style={{ fontSize: 12, color: colors.subtleDark }}>Favoritos</Text>
          </View>
          <View style={{ width: 1, backgroundColor: '#D8D9DC', marginVertical: 12 }} />
          <View style={{ flex: 1, alignItems: 'center', paddingVertical: 16, gap: 4 }}>
            <Star size={20} color={colors.primary} strokeWidth={1.5} />
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.normal }}>1.0</Text>
            <Text style={{ fontSize: 12, color: colors.subtleDark }}>Versão</Text>
          </View>
        </View>

        {/* Seção: App */}
        <View style={{ marginTop: 28 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: colors.subtleDark,
              letterSpacing: 0.8,
              textTransform: 'uppercase',
              paddingHorizontal: 24,
              marginBottom: 8,
            }}
          >
            App
          </Text>
          <View
            style={{
              marginHorizontal: 24,
              borderRadius: 16,
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.background,
            }}
          >
            <MenuRow
              icon={<Heart size={18} color="#E53E3E" strokeWidth={1.5} />}
              iconBg="#FFF1F1"
              label="Meus Favoritos"
              onPress={() => router.push('/favorites')}
            />
            <MenuRow
              icon={<Info size={18} color={colors.primary} strokeWidth={1.5} />}
              iconBg="#EBF4FC"
              label="Sobre o BlindSpot"
              isLast
              onPress={() =>
                Alert.alert(
                  'BlindSpot',
                  'Versão 1.0.0\nDesafio Ford FIAP 2026\nInteligência Competitiva Automotiva.',
                )
              }
            />
          </View>
        </View>

        {/* Botão Sair */}
        <View style={{ marginTop: 28, marginHorizontal: 24 }}>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              paddingVertical: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#FCA5A5',
              backgroundColor: '#FFF1F1',
            })}
          >
            <LogOut size={18} color="#DC2626" strokeWidth={1.5} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#DC2626' }}>
              Sair da conta
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}
