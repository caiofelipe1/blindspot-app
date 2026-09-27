import { create as createAxios } from 'axios';

const api = createAxios({
  baseURL: 'https://parallelum.com.br/fipe/api/v1/carros',
  timeout: 15000,
});

const discoveryApi = createAxios({
  baseURL: 'https://fipe.parallelum.com.br/api/v2/cars',
  timeout: 15000,
});

// Share successful discovery responses and in-flight requests; prices stay fresh.
const cache = new Map<string, { value: unknown; expires: number }>();
const pending = new Map<string, Promise<unknown>>();
function cached<T>(key: string, request: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return Promise.resolve(hit.value as T);
  const running = pending.get(key);
  if (running) return running as Promise<T>;
  const promise = request().then(value => {
    if (cache.size >= 100) cache.delete(cache.keys().next().value!);
    cache.set(key, { value, expires: Date.now() + 30 * 60 * 1000 });
    return value;
  }).finally(() => pending.delete(key));
  pending.set(key, promise);
  return promise;
}

export function fipeErrorMessage(cause: unknown): string {
  if (cause && typeof cause === 'object' && 'isAxiosError' in cause) {
    const error = cause as { response?: { status?: number }; code?: string };
    if (error.response?.status === 429) return 'O serviço FIPE bloqueou novas consultas por limite de uso. Tentar novamente agora não libera o acesso. Aguarde a renovação do limite do serviço.';
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return 'O serviço FIPE demorou para responder. Tente novamente em instantes.';
    if (error.response?.status && error.response.status >= 500) return 'O serviço FIPE está temporariamente indisponível. Tente novamente mais tarde.';
    if (error.response?.status === 404) return 'Esta seleção não foi encontrada no serviço FIPE. Confira a versão e tente novamente.';
    if (error.response) return 'O serviço FIPE não aceitou a consulta. Tente novamente mais tarde.';
    return 'Não foi possível conectar ao serviço FIPE. Verifique sua conexão e tente novamente.';
  }
  return cause instanceof Error ? cause.message : 'Não foi possível concluir a consulta. Tente novamente.';
}

export interface FipeBrand {
  codigo: string;
  nome: string;
}

export interface FipeModel {
  codigo: number;
  nome: string;
}

export interface FipeYear {
  codigo: string;
  nome: string;
}

export interface FipeVehiclePrice {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}

export const fipeService = {
  getBrands: (): Promise<FipeBrand[]> =>
    cached('brands', () => api.get<FipeBrand[]>('/marcas').then(r => r.data)),

  getBrandYears: (brandCode: string): Promise<FipeYear[]> =>
    cached(`brand-years:${brandCode}`, () => discoveryApi
      .get<{ code: string; name: string }[]>(`/brands/${brandCode}/years`)
      .then(r => r.data.map(y => ({ codigo: y.code, nome: y.name })))),

  getModelsForYear: (brandCode: string, yearCode: string): Promise<FipeModel[]> =>
    cached(`year-models:${brandCode}:${yearCode}`, () => discoveryApi
      .get<{ code: string; name: string }[]>(`/brands/${brandCode}/years/${yearCode}/models`)
      .then(r => r.data.map(m => ({ codigo: Number(m.code), nome: m.name })))),

  getModels: (brandCode: string): Promise<FipeModel[]> =>
    api
      .get<{ modelos: FipeModel[] }>(`/marcas/${brandCode}/modelos`)
      .then(r => r.data.modelos),

  getYears: (brandCode: string, modelCode: number): Promise<FipeYear[]> =>
    api
      .get<FipeYear[]>(`/marcas/${brandCode}/modelos/${modelCode}/anos`)
      .then(r => r.data),

  getPrice: (
    brandCode: string,
    modelCode: number,
    yearCode: string,
  ): Promise<FipeVehiclePrice> =>
    api
      .get<FipeVehiclePrice>(
        `/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`,
      )
      .then(r => r.data),
};
