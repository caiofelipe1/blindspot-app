import { useEffect, useRef, useState } from 'react';
import { fipeService, fipeErrorMessage, type FipeBrand, type FipeModel, type FipeYear } from '@/src/services/fipeService';
import { availableFipeOptions, confirmedFipePrice } from '@/src/services/fipeLookup';
import { useFipeStore } from '@/src/stores/fipeStore';
import { fipeCatalogKey, savedFipeFor, type FipeCatalogVehicle } from './savedFipe';

export function useFipeLookup(vehicle: FipeCatalogVehicle) {
  const { brand: brandName, model: modelName, year: expectedYear } = vehicle;
  const { quotes, hydrated, hydrationError, hydrate, saveQuote, removeQuote } = useFipeStore();
  const saved = savedFipeFor(vehicle, quotes);
  const [started, setStarted] = useState(false);
  const [options, setOptions] = useState<{ model: FipeModel; years: FipeYear[] }[]>([]);
  const [models, setModels] = useState<FipeModel[]>([]);
  const [years, setYears] = useState<FipeYear[]>([]);
  const [brand, setBrand] = useState<FipeBrand | null>(null);
  const [model, setModel] = useState<FipeModel | null>(null);
  const [year, setYear] = useState<FipeYear | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; retry: () => void } | null>(null);
  const requestId = useRef(0);
  useEffect(() => () => { requestId.current++; }, []);
  useEffect(() => { void hydrate(); }, [hydrate]);

  async function run<T>(request: () => Promise<T>, success: (value: T) => void | Promise<void>, retry: () => void): Promise<void> {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    try {
      const value = await request();
      if (id === requestId.current) {
        await success(value);
        if (id === requestId.current) setLoading(false);
      }
    } catch (cause) {
      if (id === requestId.current) {
        // Keep a small diagnostic in Metro; never log request headers or saved data.
        if (__DEV__) {
          const details = cause as { code?: string; response?: { status?: number }; config?: { baseURL?: string; url?: string } } | null;
          console.warn('[FIPE]', {
            vehicle: `${brandName} ${modelName} ${expectedYear}`,
            code: details?.code,
            status: details?.response?.status,
            endpoint: details?.config?.url,
            service: details?.config?.baseURL,
            message: fipeErrorMessage(cause),
          });
        }
        setLoading(false);
        setError({ message: fipeErrorMessage(cause), retry });
      }
    }
  }

  function start(): void {
    if (!hydrated || loading) return;
    setStarted(true);
    setBrand(null); setOptions([]); setModels([]); setModel(null); setYears([]); setYear(null);
    void run(() => availableFipeOptions(fipeService, brandName, modelName, expectedYear), result => {
      setBrand(result.brand);
      setOptions(result.options);
      setModels(result.options.map(option => option.model));
      if (result.options.length === 1) {
        const only = result.options[0];
        setModel(only.model);
        setYears(only.years);
        if (only.years.length === 1) setYear(only.years[0]);
      }
    }, start);
  }
  function selectModel(next: FipeModel | null): void {
    requestId.current++;
    const available = options.find(option => option.model.codigo === next?.codigo);
    setModel(available?.model ?? null); setError(null); setLoading(false);
    setYears(available?.years ?? []);
    setYear(available?.years.length === 1 ? available.years[0] : null);
  }
  function selectYear(next: FipeYear | null): void {
    requestId.current++;
    setYear(next); setError(null); setLoading(false);
  }
  function consult(): void {
    if (!brand || !model || !year || loading) return;
    void run(() => confirmedFipePrice(fipeService.getPrice, brand, model, year, expectedYear), async value => {
      await saveQuote(vehicle.id, { catalogKey: fipeCatalogKey(vehicle), brand, model, year, price: value, consultedAt: new Date().toISOString() });
      setStarted(false);
    }, consult);
  }
  function refresh(): void {
    if (!saved || loading) return;
    void run(() => confirmedFipePrice(fipeService.getPrice, saved.brand, saved.model, saved.year, expectedYear), async value => {
      await saveQuote(vehicle.id, { ...saved, price: value, consultedAt: new Date().toISOString() });
    }, refresh);
  }
  function remove(): void {
    if (loading) return;
    void run(() => removeQuote(vehicle.id), () => { setStarted(false); }, remove);
  }
  function cancel(): void {
    requestId.current++;
    setStarted(false); setLoading(false); setError(null);
  }
  return { started, start, models, years, brand, model, year, loading, error, selectModel, selectYear, consult,
    saved, hydrated, hydrationError, hydrate, refresh, remove, cancel };
}
