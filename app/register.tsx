import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { colors } from '@/src/styles/tokens';

const IMG_CAR = require('../assets/images/register-car.png');

const TOTAL_STEPS = 3;

export default function RegisterScreen() {
  const router = useRouter();

  const [nome,                 setNome]                 = useState('');
  const [email,                setEmail]                = useState('');
  const [senha,                setSenha]                = useState('');
  const [confirmarSenha,       setConfirmarSenha]       = useState('');
  const [senhaVisivel,         setSenhaVisivel]         = useState(false);
  const [confirmarSenhaVisivel,setConfirmarSenhaVisivel]= useState(false);

  function handleProximo() {
    // TODO: navegar para /register-info quando a rota existir
    // router.push('/register-info');
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        {/* ── Header ── */}
        <View className="h-[76px] bg-white border-b border-background flex-row items-end pb-5 px-8 gap-4">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <ChevronLeft size={24} color={colors.normal} strokeWidth={1.5} />
          </Pressable>

          {/* Barra de progresso — etapa 1 de 3 */}
          <View className="flex-1 flex-row gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <View
                key={i}
                className={`flex-1 h-1.5 rounded-full ${
                  i === 0 ? 'bg-primary' : 'bg-background'
                }`}
              />
            ))}
          </View>
        </View>

        {/* ── Conteúdo rolável ── */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 32,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* Ilustração */}
          <Image
            source={IMG_CAR}
            className="w-full h-[160px]"
            resizeMode="contain"
          />

          {/* Título */}
          <Text className="text-[40px] font-semibold text-normal text-center leading-[48px] mt-6 mb-7">
            Cadastre-se
          </Text>

          {/* Formulário */}
          <View className="gap-4">
            <Input
              label="Nome"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="Seu nome completo"
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="seu@email.com"
            />

            <Input
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!senhaVisivel}
              placeholder="••••••••"
              rightIcon={
                <Pressable onPress={() => setSenhaVisivel(v => !v)} hitSlop={8}>
                  {senhaVisivel
                    ? <EyeOff size={20} color={colors.subtleLight} strokeWidth={1.5} />
                    : <Eye    size={20} color={colors.subtleLight} strokeWidth={1.5} />}
                </Pressable>
              }
            />

            <Input
              label="Confirmar senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!confirmarSenhaVisivel}
              placeholder="••••••••"
              rightIcon={
                <Pressable onPress={() => setConfirmarSenhaVisivel(v => !v)} hitSlop={8}>
                  {confirmarSenhaVisivel
                    ? <EyeOff size={20} color={colors.subtleLight} strokeWidth={1.5} />
                    : <Eye    size={20} color={colors.subtleLight} strokeWidth={1.5} />}
                </Pressable>
              }
            />
          </View>

          {/* Botão Próximo */}
          <View className="mt-8">
            <Button label="Próximo" onPress={handleProximo} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
