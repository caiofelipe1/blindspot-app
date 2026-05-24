import { create } from 'zustand';

interface ToastItem {
  id: string;
  title: string;
  body: string;
}

interface ToastState {
  toasts: ToastItem[];
  show: (title: string, body: string) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  show: (title, body) => {
    const id = Date.now().toString();
    set((s) => ({ toasts: [...s.toasts, { id, title, body }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },

  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
