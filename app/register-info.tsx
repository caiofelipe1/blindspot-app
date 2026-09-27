import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Check, ChevronLeft } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/styles/tokens';
import { useAuthStore } from '@/src/stores/authStore';
import { useAuthReady } from '@/src/utils/useAuthReady';
import { AuthStorageNotice } from '@/src/components/ui/AuthStorageNotice';

export default function RegisterInfoScreen() {
  const router = useRouter();
  const authReady = useAuthReady();
  const { pendingRegistration, completeRegistration } = useAuthStore();
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function finish(): void {
    if (!authReady || done) return;
    const result = completeRegistration(remember);
    if (!result.success) { setError(result.error ?? 'Não foi possível criar a conta.'); return; }
    setDone(true);
    router.replace('/explore');
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="px-6 py-4 flex-row items-center gap-4">
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/register')} accessibilityRole="button" accessibilityLabel="Voltar ao cadastro" className="p-2">
          <ChevronLeft size={24} color={colors.normal} />
        </Pressable>
        <View className="flex-1 flex-row gap-2"><View className="h-1.5 flex-1 rounded-full bg-primary" /><View className="h-1.5 flex-1 rounded-full bg-primary" /></View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
        <Text className="text-3xl font-semibold text-normal">Confirme seu cadastro</Text>
        <AuthStorageNotice />
        {pendingRegistration ? <View className="rounded-xl bg-background p-4 gap-2">
          <Text className="text-lg font-semibold text-normal">{pendingRegistration.name}</Text>
          <Text className="text-base text-subtle-dark">{pendingRegistration.email}</Text>
        </View> : !done && <View className="gap-3">
          <Text className="text-base text-subtle-dark">Preencha a primeira etapa para criar sua conta.</Text>
          <Button label="Ir para cadastro" onPress={() => router.replace('/register')} />
        </View>}
        <View className="gap-3">
          <Text className="text-lg font-semibold text-normal">Conta neste aparelho</Text>
          <Text className="text-base text-subtle-dark">Seu cadastro fica salvo somente neste aparelho. Não há sincronização com outros dispositivos nem recuperação de senha por e-mail nesta versão.</Text>
          <Text className="text-sm text-subtle-dark">Favoritos e histórico pertencem ao aparelho e são compartilhados entre as contas locais. Desinstalar o app ou apagar seus dados pode remover o cadastro e as listas.</Text>
        </View>
        <Pressable onPress={() => setRemember(value => !value)} accessibilityRole="checkbox" accessibilityState={{ checked: remember }} className="flex-row items-center gap-3 py-2">
          <View className={`w-6 h-6 rounded border items-center justify-center ${remember ? 'bg-primary border-primary' : 'border-subtle-light'}`}>
            {remember && <Check size={16} color={colors.white} />}
          </View>
          <Text className="flex-1 text-base text-normal">Lembrar de mim neste aparelho</Text>
        </Pressable>
        <Text className="text-sm text-subtle-dark">Se deixar desmarcado, será necessário entrar novamente ao reiniciar o app. Sua conta continuará cadastrada.</Text>
        {!!error && <Text accessibilityRole="alert" className="text-sm text-red-600">{error}</Text>}
        {pendingRegistration && <Button label="Criar conta" onPress={finish} disabled={!authReady || done} />}
      </ScrollView>
    </SafeAreaView>
  );
}
