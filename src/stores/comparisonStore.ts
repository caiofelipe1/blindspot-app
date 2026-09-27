import { create } from 'zustand';

export const MAX_COMPARISON_VEHICLES = 3;

interface ComparisonState {
  selectedIds: string[];
  selectedAttributes: string[] | null;
  setAttributes: (labels: string[] | null) => void;
  addVehicle: (id: string) => void;
  removeVehicle: (id: string) => void;
  replaceVehicle: (currentId: string, nextId: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  selectedIds: [],
  selectedAttributes: null,
  setAttributes: (selectedAttributes) => set({ selectedAttributes }),
  addVehicle: (id) =>
    set(s => {
      if (s.selectedIds.includes(id) || s.selectedIds.length >= MAX_COMPARISON_VEHICLES) return s;
      return { selectedIds: [...s.selectedIds, id] };
    }),
  removeVehicle: (id) =>
    set(s => ({ selectedIds: s.selectedIds.filter(sid => sid !== id) })),
  replaceVehicle: (currentId, nextId) =>
    set(s => {
      if (!s.selectedIds.includes(currentId) || s.selectedIds.includes(nextId)) return s;
      return { selectedIds: s.selectedIds.map(id => id === currentId ? nextId : id) };
    }),
  clearAll: () => set({ selectedIds: [] }),
  isSelected: (id) => get().selectedIds.includes(id),
}));
