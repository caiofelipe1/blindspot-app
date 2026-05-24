import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useKeyboardVisible } from '@/src/utils/useKeyboardVisible';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Eye, EyeOff, Check, AlertCircle } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { colors } from '@/src/styles/tokens';
import { useAuthStore } from '@/src/stores/authStore';

const IMG_CAR = require('../assets/images/car-login.png');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export default function LoginScreen() {
  const router     = useRouter();
  const { isLoggedIn, login } = useAuthStore();
  const keyboardVisible = useKeyboardVisible();

  const [email,         setEmail]         = useState('');
  const [senha,         setSenha]         = useState('');
  const [lembrar,       setLembrar]       = useState(false);
  const [senhaVisivel,  setSenhaVisivel]  = useState(false);
  const [loading,       setLoading]       = useState(false);

  const [emailError,  setEmailError]  = useState('');
  const [senhaError,  setSenhaError]  = useState('');
  const [loginError,  setLoginError]  = useState('');

  // Redireciona se já estiver logado
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/explore' as never);
    }
  }, [isLoggedIn]);

  const emailOk  = isValidEmail(email);
  const senhaOk  = senha.length > 0;
  const canLogin = emailOk && senhaOk && !loading;

  function clearErrors() {
    if (loginError) setLoginError('');
  }

  function handleEmailChange(v: string) {
    setEmail(v);
    if (emailError) setEmailError('');
    clearErrors();
  }

  function handleSenhaChange(v: string) {
    setSenha(v);
    if (senhaError) setSenhaError('');
    clearErrors();
  }

  function handleEmailBlur() {
    if (email && !emailOk) setEmailError('Digite um email válido.');
  }

  function handleSenhaBlur() {
    if (!senha) setSenhaError('A senha é obrigatória.');
  }

  async function handleLogin() {
    setLoginError('');

    // Validação antes de chamar a API
    let hasError = false;
    if (!email.trim()) {
      setEmailError('Email obrigatório.');
      hasError = true;
    } else if (!emailOk) {
      setEmailError('Digite um email válido.');
      hasError = true;
    }
    if (!senha) {
      setSenhaError('A senha é obrigatória.');
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    try {
      const result = await login(email, senha);
      if (result.success) {
        router.replace('/explore' as never);
      } else {
        setLoginError(result.error ?? 'Erro ao fazer login.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleForgotPassword() {
    router.push('/reset-password');
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* ── Header ── */}
        <View className="h-[76px] bg-white border-b border-background flex-row items-end pb-5 px-8">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <ChevronLeft size={24} color={colors.normal} strokeWidth={1.5} />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-8 pb-6 justify-between">

            {/* ── Seção superior ── */}
            <View className="gap-7">

              {/* Ilustração — oculta quando teclado está aberto */}
              {!keyboardVisible && (
                <Image
                  source={IMG_CAR}
                  className="w-full h-[200px]"
                  resizeMode="contain"
                />
              )}

              {/* Título */}
              <Text className="text-[40px] font-semibold text-normal text-center leading-[48px]">
                Login
              </Text>

              {/* Formulário */}
              <View className="gap-4">

                {/* Email */}
                <Input
                  label="Email"
                  value={email}
                  onChangeText={handleEmailChange}
                  onBlur={handleEmailBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  placeholder="seu@email.com"
                  error={emailError || undefined}
                  returnKeyType="next"
                />

                <View className="gap-3">
                  {/* Senha */}
                  <Input
                    label="Senha"
                    value={senha}
                    onChangeText={handleSenhaChange}
                    onBlur={handleSenhaBlur}
                    secureTextEntry={!senhaVisivel}
                    autoComplete="password"
                    placeholder="••••••••"
                    returnKeyType="done"
                    onSubmitEditing={canLogin ? handleLogin : undefined}
                    error={senhaError || undefined}
                    rightIcon={
                      <Pressable onPress={() => setSenhaVisivel(v => !v)} hitSlop={8}>
                        {senhaVisivel
                          ? <EyeOff size={22} color={colors.subtleLight} strokeWidth={1.5} />
                          : <Eye   size={22} color={colors.subtleLight} strokeWidth={1.5} />
                        }
                      </Pressable>
                    }
                  />

                  {/* Lembrar de mim + Esqueceu a senha? */}
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

                    <Pressable onPress={handleForgotPassword} hitSlop={8}>
                      <Text className="text-muted text-xs font-medium tracking-[0.6px]">
                        Esqueceu a senha?
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* Erro geral de autenticação */}
              {loginError ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    backgroundColor: '#FFF1F1',
                    borderWidth: 1,
                    borderColor: '#FEC5C5',
                    borderRadius: 12,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  }}
                >
                  <AlertCircle size={16} color="#DC2626" strokeWidth={1.5} />
                  <Text style={{ flex: 1, fontSize: 13, color: '#DC2626', lineHeight: 18 }}>
                    {loginError}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* ── Botão Entrar ── */}
            <View style={{ marginTop: 32, gap: 16 }}>
              <Button
                label={loading ? 'Entrando...' : 'Entrar'}
                onPress={handleLogin}
                disabled={!canLogin}
              />

              {/* Link para cadastro */}
              <Pressable
                onPress={() => router.push('/register')}
                hitSlop={8}
                style={{ alignItems: 'center' }}
              >
                <Text style={{ fontSize: 14, color: colors.subtleDark }}>
                  Ainda não tem conta?{' '}
                  <Text style={{ color: colors.primary, fontWeight: '600' }}>
                    Cadastre-se
                  </Text>
                </Text>
              </Pressable>

              {/* Dica de credenciais mock (visível apenas em dev) */}
              {__DEV__ && (
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.subtleLight,
                    textAlign: 'center',
                    letterSpacing: 0.2,
                  }}
                >
                  Teste: test@ford.com · 123456
                </Text>
              )}
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
