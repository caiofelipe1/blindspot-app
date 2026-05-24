import { useToastStore } from '@/src/stores/toastStore';

export function notifyFavoriteAdded(vehicleName: string): void {
  useToastStore.getState().show(
    'Adicionado aos favoritos',
    `${vehicleName} foi salvo na sua lista de favoritos.`,
  );
}

export function notifyComparisonReady(count: number): void {
  useToastStore.getState().show(
    'Comparação pronta!',
    `Você tem ${count} veículos selecionados. Acesse Comparar para ver lado a lado.`,
  );
}
