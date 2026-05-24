import axios from 'axios';

const api = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1/carros',
  timeout: 10000,
});

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
    api.get<FipeBrand[]>('/marcas').then(r => r.data),

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
