import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_VEHICLES } from '@/src/data/vehicles.mock';

const INITIAL_IDS = ALL_VEHICLES.filter(v => v.isFavorite).map(v => v.id);

interface FavoritesState {
  favoriteIds: string[];
  _hydrated: boolean;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: INITIAL_IDS,
      _hydrated: false,

      toggleFavorite: (id) => {
        const current = get().favoriteIds;
        set({
          favoriteIds: current.includes(id)
            ? current.filter(i => i !== id)
            : [...current, id],
        });
      },

      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {
      name: 'blindspot-favorites',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
      onRehydrateStorage: () => (state) => {
        if (state) state._hydrated = true;
      },
    },
  ),
);
