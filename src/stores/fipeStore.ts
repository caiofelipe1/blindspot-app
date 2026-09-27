import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FipeQuotes, SavedFipeQuote } from '@/src/utils/savedFipe';

interface FipeState {
  quotes: FipeQuotes;
  hydrated: boolean;
  hydrationError: string | null;
  hydrate: () => Promise<void>;
  saveQuote: (vehicleId: string, quote: SavedFipeQuote) => Promise<void>;
  removeQuote: (vehicleId: string) => Promise<void>;
}

const STORAGE_KEY = 'blindspot-fipe-quotes';
let hydration: Promise<void> | null = null;
let writing: Promise<void> = Promise.resolve();

export const useFipeStore = create<FipeState>((set, get) => {
  // Serialize writes and show a saved result only after persistence succeeds.
  function update(change: (quotes: FipeQuotes) => FipeQuotes): Promise<void> {
    const task = writing.then(async () => {
      await get().hydrate();
      if (!get().hydrated) throw new Error('Storage unavailable');
      const quotes = change(get().quotes);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, quotes }));
      set({ quotes });
    });
    writing = task.catch(() => {});
    return task.catch(() => { throw new Error('Não foi possível salvar a consulta neste aparelho. Tente novamente.'); });
  }
  return {
    quotes: {}, hydrated: false, hydrationError: null,
    hydrate: async () => {
      if (get().hydrated) return;
      if (hydration) return hydration;
      hydration = (async () => {
        try {
          const raw = await AsyncStorage.getItem(STORAGE_KEY);
          const data = raw ? JSON.parse(raw) : null;
          if (data && (data.version !== 1 || !data.quotes || typeof data.quotes !== 'object' || Array.isArray(data.quotes))) throw new Error('Invalid saved data');
          set({ quotes: data?.quotes ?? {}, hydrated: true, hydrationError: null });
        } catch {
          set({ hydrationError: 'Não foi possível ler as consultas salvas. Tente novamente.' });
        }
      })();
      await hydration;
      hydration = null;
    },
    saveQuote: (vehicleId, quote) => update(quotes => ({ ...quotes, [vehicleId]: quote })),
    removeQuote: vehicleId => update(previous => {
      const quotes = { ...previous };
      delete quotes[vehicleId];
      return quotes;
    }),
  };
});
