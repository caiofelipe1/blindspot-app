import { create } from 'zustand';

interface ComparisonState {
  selectedIds: string[];
  addVehicle: (id: string) => void;
  removeVehicle: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  selectedIds: [],
  addVehicle: (id) =>
    set(s => {
      if (s.selectedIds.includes(id) || s.selectedIds.length >= 3) return s;
      return { selectedIds: [...s.selectedIds, id] };
    }),
  removeVehicle: (id) =>
    set(s => ({ selectedIds: s.selectedIds.filter(sid => sid !== id) })),
  clearAll: () => set({ selectedIds: [] }),
  isSelected: (id) => get().selectedIds.includes(id),
}));
