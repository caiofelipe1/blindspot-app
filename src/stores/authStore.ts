import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface Credential {
  id: string;
  email: string;
  password: string;
  name: string;
}

interface PendingRegistration {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  rememberMe: boolean;
  credentials: Credential[];
  pendingRegistration: PendingRegistration | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setPendingRegistration: (data: PendingRegistration) => void;
  completeRegistration: (rememberMe?: boolean) => { success: boolean; error?: string };
}

const DEFAULT_CREDENTIALS: Credential[] = [
  { id: '1', email: 'test@ford.com', password: '123456', name: 'Usuário Ford' },
];

// Transient loading/error state must not itself write to persisted credentials.
export const useAuthHydration = create<{ ready: boolean; error: string | null }>(() => ({ ready: false, error: null }));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      rememberMe: false,
      credentials: DEFAULT_CREDENTIALS,
      pendingRegistration: null,

      login: async (email, password, rememberMe = false) => {
        const found = get().credentials.find(
          u =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password,
        );

        if (found) {
          set({ user: { id: found.id, email: found.email, name: found.name }, isLoggedIn: true, rememberMe });
          return { success: true };
        }

        return { success: false, error: 'Email ou senha incorretos.' };
      },

      logout: () => set({ user: null, isLoggedIn: false, rememberMe: false, pendingRegistration: null }),

      setPendingRegistration: (data) => set({ pendingRegistration: data }),

      completeRegistration: (rememberMe = false) => {
        const { pendingRegistration, credentials } = get();
        if (!pendingRegistration) return { success: false, error: 'Dados de cadastro não encontrados.' };
        if (!pendingRegistration.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pendingRegistration.email.trim()) || pendingRegistration.password.length < 6) {
          return { success: false, error: 'Revise nome, e-mail e senha antes de concluir.' };
        }

        const exists = credentials.find(
          u => u.email.toLowerCase() === pendingRegistration.email.trim().toLowerCase(),
        );
        if (exists) return { success: false, error: 'Este e-mail já está cadastrado.' };

        const newUser: Credential = {
          id: String(Date.now()),
          email: pendingRegistration.email.trim(),
          password: pendingRegistration.password,
          name: pendingRegistration.name.trim(),
        };

        set((s) => ({
          credentials: [...s.credentials, newUser],
          user: { id: newUser.id, email: newUser.email, name: newUser.name },
          isLoggedIn: true,
          rememberMe,
          pendingRegistration: null,
        }));

        return { success: true };
      },
    }),
    {
      name: 'auth-store',
      version: 1,
      migrate: (persisted) => {
        const previous = persisted as Partial<AuthState>;
        return { credentials: previous.credentials ?? DEFAULT_CREDENTIALS, user: null, isLoggedIn: false, rememberMe: false };
      },
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        useAuthHydration.setState({ ready: false, error: null });
        return (_, error) => useAuthHydration.setState({
          ready: !error,
          error: error ? 'Não foi possível carregar as contas deste aparelho.' : null,
        });
      },
      partialize: (s) => ({
        user: s.rememberMe ? s.user : null,
        isLoggedIn: s.rememberMe && s.isLoggedIn,
        rememberMe: s.rememberMe,
        credentials: s.credentials,
      }),
    },
  ),
);
