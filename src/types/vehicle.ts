export interface Vehicle {
  id: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  imagem: string;
  preco: number;
  motor: string;
  potencia: string;
  torque: string;
  cambio: string;
  tracao: string;
  consumoUrbano: string;
  consumoRodoviario: string;
  dimensoes: {
    comprimento: number;
    largura: number;
    altura: number;
    entre_eixos: number;
  };
  portaMalas: number;
  peso: number;
  fontes: string[];
  confiabilidade: 'verificado' | 'parcial' | 'nao_verificado';
}
