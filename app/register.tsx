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
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { colors } from '@/src/styles/tokens';
import { useKeyboardVisible } from '@/src/utils/useKeyboardVisible';
import { useAuthStore } from '@/src/stores/authStore';

const IMG_CAR = require('../assets/images/register-car.png');

const TOTAL_STEPS = 3;

export default function RegisterScreen() {
  const router = useRouter();
  const keyboardVisible = useKeyboardVisible();
  const { setPendingRegistration } = useAuthStore();

  const [nome,                  setNome]                  = useState('');
  const [email,                 setEmail]                 = useState('');
  const [senha,                 setSenha]                 = useState('');
  const [confirmarSenha,        setConfirmarSenha]        = useState('');
  const [senhaVisivel,          setSenhaVisivel]          = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validar() {
    const e: Record<string, string> = {};
    if (!nome.trim()) e.nome = 'Nome obrigatório.';
    if (!email.trim()) e.email = 'Email obrigatório.';
    else if (!EMAIL_RE.test(email.trim())) e.email = 'Digite um email válido.';
    if (!senha) e.senha = 'Senha obrigatória.';
    else if (senha.length < 6) e.senha = 'Mínimo 6 caracteres.';
    if (!confirmarSenha) e.confirmarSenha = 'Confirme sua senha.';
    else if (senha !== confirmarSenha) e.confirmarSenha = 'As senhas não coincidem.';
    return e;
  }

  function handleProximo() {
    const e = validar();
    if (Object.keys(e).length > 0) { setErros(e); return; }
    setPendingRegistration({ name: nome.trim(), email: email.trim(), password: senha });
    router.push('/register-info');
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
              className={`flex-1 h-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-background'}`}
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
                className="w-full h-[110px]"
                resizeMode="contain"
              />
              <Text className="text-[36px] font-semibold text-normal text-center leading-[44px] mt-3">
                Cadastre-se
              </Text>
            </View>
          )}

          {/* Formulário */}
          <View style={{ gap: 12 }}>
            <Input
              label="Nome"
              value={nome}
              onChangeText={v => { setNome(v); if (erros.nome) setErros(e => ({ ...e, nome: '' })); }}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="Seu nome completo"
              returnKeyType="next"
              error={erros.nome}
            />
            <Input
              label="Email"
              value={email}
              onChangeText={v => { setEmail(v); if (erros.email) setErros(e => ({ ...e, email: '' })); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="seu@email.com"
              returnKeyType="next"
              error={erros.email}
            />
            <Input
              label="Senha"
              value={senha}
              onChangeText={v => { setSenha(v); if (erros.senha) setErros(e => ({ ...e, senha: '' })); }}
              secureTextEntry={!senhaVisivel}
              placeholder="••••••••"
              returnKeyType="next"
              error={erros.senha}
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
              onChangeText={v => { setConfirmarSenha(v); if (erros.confirmarSenha) setErros(e => ({ ...e, confirmarSenha: '' })); }}
              secureTextEntry={!confirmarSenhaVisivel}
              placeholder="••••••••"
              returnKeyType="done"
              error={erros.confirmarSenha}
              rightIcon={
                <Pressable onPress={() => setConfirmarSenhaVisivel(v => !v)} hitSlop={8}>
                  {confirmarSenhaVisivel
                    ? <EyeOff size={20} color={colors.subtleLight} strokeWidth={1.5} />
                    : <Eye    size={20} color={colors.subtleLight} strokeWidth={1.5} />}
                </Pressable>
              }
            />
          </View>

          {/* Botão */}
          <Button label="Próximo" onPress={handleProximo} />

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
