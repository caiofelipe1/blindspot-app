import { create } from 'zustand';
import { fipeService, type FipeBrand } from '@/src/services/fipeService';

interface VehicleState {
  fipeBrands: FipeBrand[];
  fipeBrandsLoading: boolean;
  fipeBrandsError: string | null;
  fetchFipeBrands: () => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  fipeBrands: [],
  fipeBrandsLoading: false,
  fipeBrandsError: null,

  fetchFipeBrands: async () => {
    if (get().fipeBrands.length > 0) return;
    set({ fipeBrandsLoading: true, fipeBrandsError: null });
    try {
      const brands = await fipeService.getBrands();
      set({ fipeBrands: brands, fipeBrandsLoading: false });
    } catch {
      set({
        fipeBrandsError: 'Falha ao carregar marcas FIPE.',
        fipeBrandsLoading: false,
      });
    }
  },
}));
