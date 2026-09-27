import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/styles/tokens';
import { useAuthStore } from '@/src/stores/authStore';

const IMG_CAR = require('../assets/images/home-car.png');

export default function IndexScreen() {
  const router = useRouter();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>

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
              Consulte e compare veículos
            </Text>
            <Text className="text-sm text-subtle-dark text-center leading-[22px]">
              Explore fichas técnicas e compare especificações lado a lado.
            </Text>
          </View>

          {/* Botões */}
          <View className="gap-5">
            <Button label="Explorar veículos" onPress={() => router.push('/explore')} />
            <Button
              label="Comparar veículos"
              variant="secondary"
              onPress={() => router.push('/comparison')}
            />
          </View>

          {/* Acesso opcional à conta */}
          <Text style={{ fontSize: 13, color: colors.subtleDark, textAlign: 'center' }}>
            Consulte, compare e salve favoritos sem precisar de uma conta.
          </Text>
          <Pressable onPress={() => router.push(isLoggedIn ? '/profile' : '/login')} hitSlop={8} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: colors.subtleDark }}>
              {isLoggedIn ? 'Minha conta' : 'Entrar na conta'}{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>→</Text>
            </Text>
          </Pressable>

        </View>
      </ScrollView>


    </SafeAreaView>
  );
}
