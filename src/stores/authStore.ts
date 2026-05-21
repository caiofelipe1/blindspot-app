import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const MOCK_CREDENTIALS = [
  { id: '1', email: 'test@ford.com', password: '123456', name: 'Usuário Ford' },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: async (email, password) => {
    // Simula latência de rede
    await new Promise<void>(r => setTimeout(r, 800));

    const found = MOCK_CREDENTIALS.find(
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
}));
