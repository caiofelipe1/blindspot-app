import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Eye, EyeOff, Check } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { colors } from '@/src/styles/tokens';

const IMG_CAR = require('../assets/images/car-login.png');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail]               = useState('');
  const [senha, setSenha]               = useState('');
  const [lembrar, setLembrar]           = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Header ── */}
        <View className="h-[76px] bg-white border-b border-background flex-row items-end pb-5 px-8">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <ChevronLeft size={24} color={colors.normal} strokeWidth={1.5} />
          </Pressable>
        </View>

        {/* ── Corpo ── */}
        <View className="flex-1 px-6 pt-8 pb-4 justify-between">

          {/* Seção superior: ilustração + título + formulário */}
          <View className="gap-7">

            {/* Ilustração */}
            <Image
              source={IMG_CAR}
              className="w-full h-[200px]"
              resizeMode="contain"
            />

            {/* Título */}
            <Text className="text-[40px] font-semibold text-normal text-center leading-[48px]">
              Login
            </Text>

            {/* Formulário */}
            <View className="gap-4">
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="seu@email.com"
              />

              <View className="gap-3">
                <Input
                  label="Senha"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!senhaVisivel}
                  placeholder="••••••••"
                  rightIcon={
                    <Pressable onPress={() => setSenhaVisivel(v => !v)} hitSlop={8}>
                      {senhaVisivel
                        ? <EyeOff size={24} color={colors.subtleLight} strokeWidth={1.5} />
                        : <Eye   size={24} color={colors.subtleLight} strokeWidth={1.5} />}
                    </Pressable>
                  }
                />

                {/* Lembrar de mim + Esqueceu a senha */}
                <View className="flex-row items-center justify-between pt-1">
                  <Pressable
                    onPress={() => setLembrar(v => !v)}
                    className="flex-row items-center gap-2"
                    hitSlop={8}
                  >
                    <View
                      className={`w-[22px] h-[22px] rounded items-center justify-center ${
                        lembrar ? 'bg-primary' : 'border border-subtle-light'
                      }`}
                    >
                      {lembrar && (
                        <Check size={14} color={colors.white} strokeWidth={2.5} />
                      )}
                    </View>
                    <Text className="text-subtle-dark text-base font-medium tracking-[0.2px]">
                      Lembrar de mim
                    </Text>
                  </Pressable>

                  <Pressable hitSlop={8}>
                    <Text className="text-muted text-xs font-medium tracking-[0.6px]">
                      Esqueceu a senha?
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* ── Botão Entrar ── */}
          <Button
            label="Entrar"
            onPress={() => router.push('/explore')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
