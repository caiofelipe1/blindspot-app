import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_RECENT = 10;

interface RecentlyViewedState {
  recentIds: string[];
  addRecentlyViewed: (id: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      recentIds: [],
      addRecentlyViewed: (id) =>
        set((s) => ({
          recentIds: [id, ...s.recentIds.filter((r) => r !== id)].slice(0, MAX_RECENT),
        })),
      clear: () => set({ recentIds: [] }),
    }),
    {
      name: 'recently-viewed',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
