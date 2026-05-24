import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/styles/tokens';

const IMG_CAR = require('../assets/images/home-car.png');

export default function IndexScreen() {
  const router = useRouter();

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


    </SafeAreaView>
  );
}
