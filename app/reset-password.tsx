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
import { ChevronLeft, CheckCircle } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { colors } from '@/src/styles/tokens';
import { useKeyboardVisible } from '@/src/utils/useKeyboardVisible';

const IMG = require('../assets/images/register-car.png');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ResetPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const keyboardVisible = useKeyboardVisible();

  const emailOk = EMAIL_RE.test(email.trim());

  function handleEmailChange(v: string) {
    setEmail(v);
    if (emailError) setEmailError('');
  }

  function handleEmailBlur() {
    if (email && !emailOk) setEmailError('Digite um email válido.');
  }

  async function handleSend() {
    if (!email.trim()) {
      setEmailError('Email obrigatório.');
      return;
    }
    if (!emailOk) {
      setEmailError('Digite um email válido.');
      return;
    }
    setLoading(true);
    await new Promise<void>(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
      >
        {/* Header */}
        <View className="h-[76px] bg-white border-b border-background flex-row items-end pb-5 px-8">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <ChevronLeft size={24} color={colors.normal} strokeWidth={1.5} />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 32,
            gap: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Ilustração — oculta quando teclado está aberto */}
          {!keyboardVisible && (
            <Image
              source={IMG}
              style={{ width: '100%', aspectRatio: 350 / 220 }}
              resizeMode="contain"
            />
          )}

          {/* Título + subtítulo */}
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 28, fontWeight: '600',
                color: colors.normal, textAlign: 'center', lineHeight: 40,
              }}
            >
              Esqueceu sua Senha?
            </Text>
            <Text
              style={{
                fontSize: 15, color: colors.subtleDark,
                textAlign: 'center', lineHeight: 26,
              }}
            >
              Insira seu e-mail abaixo para receber instruções de redefinição de senha.
            </Text>
          </View>

          {sent ? (
            /* ── Estado de sucesso ── */
            <View style={{ gap: 16 }}>
              <View
                style={{
                  flexDirection: 'row', alignItems: 'flex-start', gap: 12,
                  backgroundColor: '#F0FAF4',
                  borderWidth: 1, borderColor: '#6FCF97',
                  borderRadius: 12, padding: 16,
                }}
              >
                <CheckCircle size={20} color="#27AE60" strokeWidth={1.5} style={{ marginTop: 2 }} />
                <Text style={{ flex: 1, fontSize: 14, color: '#27AE60', lineHeight: 22 }}>
                  Instruções enviadas para {email.trim()}. Verifique sua caixa de entrada.
                </Text>
              </View>
              <Button label="Voltar ao Login" onPress={() => router.replace('/login')} />
            </View>
          ) : (
            /* ── Formulário ── */
            <View style={{ gap: 16 }}>
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
                returnKeyType="send"
                onSubmitEditing={emailOk ? handleSend : undefined}
              />
              <Button
                label={loading ? 'Enviando...' : 'Enviar'}
                onPress={handleSend}
                disabled={!emailOk || loading}
              />
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
