import { create } from 'zustand';

interface ComparisonState {
  selectedIds: string[];
  addVehicle: (id: string) => void;
  removeVehicle: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  // Default: BMW M3 Competition vs Mercedes AMG C63 for demo
  selectedIds: ['1', '2'],
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
