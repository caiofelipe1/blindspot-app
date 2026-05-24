import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
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
  pendingRegistration: PendingRegistration | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setPendingRegistration: (data: PendingRegistration) => void;
  completeRegistration: () => { success: boolean; error?: string };
}

// Lista mutável para que novos cadastros sejam persistidos durante a sessão
const mockCredentials: { id: string; email: string; password: string; name: string }[] = [
  { id: '1', email: 'test@ford.com', password: '123456', name: 'Usuário Ford' },
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoggedIn: false,
  pendingRegistration: null,

  login: async (email, password) => {
    await new Promise<void>(r => setTimeout(r, 800));

    const found = mockCredentials.find(
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
    const pending = get().pendingRegistration;
    if (!pending) return { success: false, error: 'Dados de cadastro não encontrados.' };

    const exists = mockCredentials.find(
      u => u.email.toLowerCase() === pending.email.trim().toLowerCase(),
    );
    if (exists) return { success: false, error: 'Este e-mail já está cadastrado.' };

    const newUser = {
      id: String(Date.now()),
      email: pending.email.trim(),
      password: pending.password,
      name: pending.name.trim(),
    };
    mockCredentials.push(newUser);

    set({
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
      isLoggedIn: true,
      pendingRegistration: null,
    });
    return { success: true };
  },
}));
