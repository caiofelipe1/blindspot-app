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
  credentials: Credential[];
  pendingRegistration: PendingRegistration | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setPendingRegistration: (data: PendingRegistration) => void;
  completeRegistration: () => { success: boolean; error?: string };
}

const DEFAULT_CREDENTIALS: Credential[] = [
  { id: '1', email: 'test@ford.com', password: '123456', name: 'Usuário Ford' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      credentials: DEFAULT_CREDENTIALS,
      pendingRegistration: null,

      login: async (email, password) => {
        await new Promise<void>(r => setTimeout(r, 800));

        const found = get().credentials.find(
          u =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password,
        );

        if (found) {
          set({ user: { id: found.id, email: found.email, name: found.name }, isLoggedIn: true });
          return { success: true };
        }

        return { success: false, error: 'Email ou senha incorretos.' };
      },

      logout: () => set({ user: null, isLoggedIn: false }),

      setPendingRegistration: (data) => set({ pendingRegistration: data }),

      completeRegistration: () => {
        const { pendingRegistration, credentials } = get();
        if (!pendingRegistration) return { success: false, error: 'Dados de cadastro não encontrados.' };

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
          pendingRegistration: null,
        }));

        return { success: true };
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        user: s.user,
        isLoggedIn: s.isLoggedIn,
        credentials: s.credentials,
      }),
    },
  ),
);
