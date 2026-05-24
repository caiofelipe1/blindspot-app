import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Scale, Heart, User } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/styles/tokens';

const IMG_CAR = require('../assets/images/home-car.png');

export default function IndexScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>

      {/*
        ScrollView com flexGrow + justifyContent center:
        – Em telas grandes: conteúdo fica centralizado verticalmente.
        – Em telas compactas: rola normalmente sem sobrepor a BottomNav.
      */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
          paddingVertical: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-6">

          {/* Ilustração */}
          <Image
            source={IMG_CAR}
            className="w-full h-[160px]"
            resizeMode="contain"
          />

          {/* Textos */}
          <View className="items-center gap-3">
            <Text className="text-[28px] font-semibold text-normal text-center leading-[36px]">
              Encontre o Carro Ideal
            </Text>
            <Text className="text-sm text-subtle-dark text-center leading-[22px]">
              Compare modelos, preços e características
            </Text>
          </View>

          {/* Botões */}
          <View className="gap-5">
            <Button label="Login" onPress={() => router.push('/login')} />
            <Button
              label="Cadastre-se"
              variant="secondary"
              onPress={() => router.push('/register')}
            />
          </View>

          {/* Explorar sem conta */}
          <Pressable onPress={() => router.push('/explore')} hitSlop={8} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: colors.subtleDark }}>
              Explorar sem cadastro{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>→</Text>
            </Text>
          </Pressable>

        </View>
      </ScrollView>

      {/* ── Bottom Nav pré-login ("Entrar" ativo) ── */}
      <View className="h-[104px] bg-white border-t border-background pt-4">
        <View className="flex-row items-start justify-between px-8">
          <View className="items-center gap-1 w-[72px]">
            <Search size={28} color={colors.subtleDark} strokeWidth={1.5} />
            <Text className="text-[12px] font-medium text-subtle-dark tracking-[0.6px]">
              Explorar
            </Text>
          </View>
          <View className="items-center gap-1 w-[72px]">
            <Scale size={28} color={colors.subtleDark} strokeWidth={1.5} />
            <Text className="text-[12px] font-medium text-subtle-dark tracking-[0.6px]">
              Comparar
            </Text>
          </View>
          <View className="items-center gap-1 w-[72px]">
            <Heart size={28} color={colors.subtleDark} strokeWidth={1.5} />
            <Text className="text-[12px] font-medium text-subtle-dark tracking-[0.6px]">
              Favoritos
            </Text>
          </View>
          <View className="items-center gap-1 w-[72px]">
            <User size={28} color={colors.primary} strokeWidth={1.5} />
            <Text className="text-[12px] font-medium text-primary tracking-[0.6px]">
              Entrar
            </Text>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
}
