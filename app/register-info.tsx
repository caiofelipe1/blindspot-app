import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { colors } from '@/src/styles/tokens';
import { useKeyboardVisible } from '@/src/utils/useKeyboardVisible';
import { useAuthStore } from '@/src/stores/authStore';

const IMG_CAR = require('../assets/images/register-car.png');

const TOTAL_STEPS = 2;

export default function RegisterInfoScreen() {
  const router = useRouter();
  const keyboardVisible = useKeyboardVisible();
  const { completeRegistration } = useAuthStore();

  const [cep,        setCep]        = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero,     setNumero]     = useState('');
  const [cidade,     setCidade]     = useState('');
  const [estado,     setEstado]     = useState('');
  const [termos,     setTermos]     = useState(false);
  const [erro,       setErro]       = useState('');

  function handleConcluir() {
    const result = completeRegistration();
    if (!result.success) { setErro(result.error ?? 'Erro ao criar conta.'); return; }
    router.replace('/explore');
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>

      {/* Header */}
      <View className="h-[64px] bg-white border-b border-background flex-row items-end pb-4 px-6 gap-4">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <ChevronLeft size={24} color={colors.normal} strokeWidth={1.5} />
        </Pressable>
        <View className="flex-1 flex-row gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              className={`flex-1 h-1.5 rounded-full ${i <= 1 ? 'bg-primary' : 'bg-background'}`}
            />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 24,
            gap: 24,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Ilustração + título — oculta quando teclado está aberto */}
          {!keyboardVisible && (
            <View className="items-center">
              <Image
                source={IMG_CAR}
                className="w-full h-[100px]"
                resizeMode="contain"
              />
              <Text className="text-[36px] font-semibold text-normal text-center leading-[44px] mt-3">
                Endereço
              </Text>
            </View>
          )}

          {/* Formulário de endereço */}
          <View style={{ gap: 12 }}>
            <Input
              label="CEP"
              value={cep}
              onChangeText={setCep}
              keyboardType="numeric"
              placeholder="00000-000"
              maxLength={9}
              returnKeyType="next"
            />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Input
                  label="Logradouro"
                  value={logradouro}
                  onChangeText={setLogradouro}
                  placeholder="Rua, Av., etc."
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
              <View className="w-[76px]">
                <Input
                  label="Nº"
                  value={numero}
                  onChangeText={setNumero}
                  placeholder="000"
                  keyboardType="numeric"
                  maxLength={6}
                  returnKeyType="next"
                />
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Input
                  label="Cidade"
                  value={cidade}
                  onChangeText={setCidade}
                  placeholder="Sua cidade"
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
              <View className="w-[76px]">
                <Input
                  label="Estado"
                  value={estado}
                  onChangeText={setEstado}
                  placeholder="SP"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={2}
                  returnKeyType="done"
                />
              </View>
            </View>
          </View>

          {/* Erro de cadastro */}
          {!!erro && (
            <Text style={{ fontSize: 13, color: '#DC2626', textAlign: 'center' }}>{erro}</Text>
          )}

          {/* Termos + Botão */}
          <View style={{ gap: 16 }}>
            <Pressable
              className="flex-row items-start gap-3"
              onPress={() => setTermos(v => !v)}
              hitSlop={8}
            >
              <View
                className={`w-5 h-5 rounded border items-center justify-center mt-0.5 ${
                  termos ? 'bg-primary border-primary' : 'border-subtle-light bg-white'
                }`}
              >
                {termos && <Check size={13} color={colors.white} strokeWidth={2.5} />}
              </View>
              <Text className="flex-1 text-sm text-subtle-dark leading-5">
                Concordo com os{' '}
                <Text className="text-primary font-medium">Termos de Uso</Text>
                {' '}e a{' '}
                <Text className="text-primary font-medium">Política de Privacidade</Text>
              </Text>
            </Pressable>
            <Button label="Concluir" onPress={handleConcluir} disabled={!termos} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
