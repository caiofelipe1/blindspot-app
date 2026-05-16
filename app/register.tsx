import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
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
    router.push('/register-info');
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>

      {/* ── Header ── */}
      <View className="h-[64px] bg-white border-b border-background flex-row items-end pb-4 px-6 gap-4">
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

      {/* ── Conteúdo ── */}
      <View className="flex-1 px-6 pt-4 pb-5 justify-between">

        {/* Bloco superior: ilustração + título */}
        <View className="items-center">
          <Image
            source={IMG_CAR}
            className="w-full h-[110px]"
            resizeMode="contain"
          />
          <Text className="text-[36px] font-semibold text-normal text-center leading-[44px] mt-3">
            Cadastre-se
          </Text>
        </View>

        {/* Formulário */}
        <View className="gap-3">
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
        <Button label="Próximo" onPress={handleProximo} />

      </View>
    </SafeAreaView>
  );
}
