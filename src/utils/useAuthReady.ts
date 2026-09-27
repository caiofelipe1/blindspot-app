import { useAuthHydration } from '@/src/stores/authStore';

export function useAuthReady(): boolean {
  return useAuthHydration(state => state.ready);
}
