import { ImageSourcePropType } from 'react-native';

export interface VehicleMock {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  image: ImageSourcePropType;
  price: number;
  rating: number;
  fuel: string;
  power: string;
  bodyType: string;
  transmission: string;
  category: 'popular' | 'favorite' | 'electric';
  isFavorite: boolean;
  isElectric: boolean;
  isFeatured?: boolean;
  // Detail fields
  torque?: string;
  engineType?: string;
  traction?: string;
  dimensions?: {
    comprimento: number;
    largura: number;
    altura: number;
    entre_eixos: number;
    portaMalas: number;
  };
  weight?: number;
  urbanConsumption?: string;
  highwayConsumption?: string;
  acceleration?: string;
  topSpeed?: string;
  safetyFeatures?: string[];
  otherAttributes?: Array<{ label: string; value: string }>;
  dataSources?: string[];
  confidenceStatus?: 'verificado' | 'parcial' | 'nao_verificado';
}

const img = {
  home:     require('../../assets/images/home-car.png')     as ImageSourcePropType,
  register: require('../../assets/images/register-car.png') as ImageSourcePropType,
  login:    require('../../assets/images/car-login.png')    as ImageSourcePropType,
};

export const popularVehicles: VehicleMock[] = [
  {
    id: '1', brand: 'BMW', model: 'M3 Competition', version: 'M3 Competition xDrive',
    year: 2024, image: img.home, price: 849950, rating: 4.9,
    fuel: 'Gasolina', power: '510 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'popular', isFavorite: false, isElectric: false, isFeatured: true,
    torque: '650 Nm', engineType: '3.0 Biturbo 6 cil. em linha', traction: 'Traseira / xDrive',
    dimensions: { comprimento: 4794, largura: 1903, altura: 1433, entre_eixos: 2857, portaMalas: 480 },
    weight: 1730,
    urbanConsumption: '8,5 km/l', highwayConsumption: '12,3 km/l',
    acceleration: '3,9 s', topSpeed: '290 km/h',
    safetyFeatures: ['ABS + EBD', '6 airbags', 'Controle de estabilidade (DSC)', 'Frenagem automática de emergência', 'Alerta de saída de faixa', 'Câmera de ré'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '2 anos' }],
    dataSources: ['BMW Brasil', 'Fabricante', 'DETRAN'],
    confidenceStatus: 'verificado',
  },
  {
    id: '2', brand: 'Mercedes', model: 'AMG C63', version: 'C63 S E-Performance',
    year: 2024, image: img.register, price: 799000, rating: 4.8,
    fuel: 'Híbrido (gasolina + elétrico)', power: '680 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'popular', isFavorite: false, isElectric: false,
    torque: '1.020 Nm', engineType: '2.0 Turbo + Motor elétrico', traction: 'Traseira (RWD)',
    dimensions: { comprimento: 4751, largura: 1843, altura: 1437, entre_eixos: 2865, portaMalas: 455 },
    weight: 2111,
    urbanConsumption: '7,2 km/l', highwayConsumption: '11,0 km/l',
    acceleration: '3,4 s', topSpeed: '280 km/h',
    safetyFeatures: ['ABS + EBD', '9 airbags', 'Controle de estabilidade', 'Câmera 360°', 'Alerta de ponto cego', 'Frenagem autônoma'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '2 anos' }],
    dataSources: ['Mercedes-Benz Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '3', brand: 'Audi', model: 'RS6 Avant', version: 'RS6 Avant Performance',
    year: 2024, image: img.login, price: 1099990, rating: 4.9,
    fuel: 'Gasolina', power: '600 cv', bodyType: 'Perua', transmission: 'Automático',
    category: 'popular', isFavorite: false, isElectric: false,
    torque: '800 Nm', engineType: '4.0 TFSI Biturbo V8', traction: 'Quattro (4x4)',
    dimensions: { comprimento: 4995, largura: 1951, altura: 1487, entre_eixos: 2924, portaMalas: 565 },
    weight: 2075,
    urbanConsumption: '6,5 km/l', highwayConsumption: '10,5 km/l',
    acceleration: '3,6 s', topSpeed: '250 km/h',
    safetyFeatures: ['ABS + EBD', '8 airbags', 'Controle de estabilidade (ESC)', 'Assistente de colisão frontal', 'Câmera de ré', 'Alerta de ponto cego'],
    otherAttributes: [{ label: 'Carroceria', value: 'Perua (Estate)' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '2 anos' }],
    dataSources: ['Audi Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '4', brand: 'Porsche', model: '911 Carrera', version: '911 Carrera S',
    year: 2024, image: img.home, price: 899000, rating: 5.0,
    fuel: 'Gasolina', power: '385 cv', bodyType: 'Coupé', transmission: 'PDK',
    category: 'popular', isFavorite: true, isElectric: false, isFeatured: true,
    torque: '450 Nm', engineType: '3.0 Boxer Biturbo 6 cil.', traction: 'Traseira (RWD)',
    dimensions: { comprimento: 4519, largura: 1852, altura: 1300, entre_eixos: 2450, portaMalas: 132 },
    weight: 1500,
    urbanConsumption: '9,0 km/l', highwayConsumption: '13,5 km/l',
    acceleration: '3,5 s', topSpeed: '308 km/h',
    safetyFeatures: ['ABS + EBD', 'Airbags dianteiros e laterais', 'Controle de estabilidade (PSM)', 'Assistente de faixa', 'Câmera de ré'],
    otherAttributes: [{ label: 'Carroceria', value: 'Coupé' }, { label: 'Assentos', value: '2+2' }, { label: 'Rotação máx.', value: '9.000 rpm' }],
    dataSources: ['Porsche Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '5', brand: 'Lamborghini', model: 'Huracán', version: 'Huracán EVO',
    year: 2024, image: img.register, price: 3500000, rating: 5.0,
    fuel: 'Gasolina', power: '640 cv', bodyType: 'Coupé', transmission: 'Automático',
    category: 'popular', isFavorite: false, isElectric: false, isFeatured: true,
    torque: '600 Nm', engineType: '5.2 V10 Atmosférico', traction: 'Integral (AWD)',
    dimensions: { comprimento: 4521, largura: 1933, altura: 1165, entre_eixos: 2620, portaMalas: 100 },
    weight: 1422,
    urbanConsumption: '5,8 km/l', highwayConsumption: '9,5 km/l',
    acceleration: '2,9 s', topSpeed: '325 km/h',
    safetyFeatures: ['ABS', 'Controle de tração (TC)', 'ESC', 'Freios cerâmicos (opcional)'],
    otherAttributes: [{ label: 'Carroceria', value: 'Coupé' }, { label: 'Rotação máx.', value: '8.000 rpm' }, { label: 'Assentos', value: '2' }],
    dataSources: ['Lamborghini', 'Fabricante'],
    confidenceStatus: 'parcial',
  },
];

export const favoriteVehicles: VehicleMock[] = [
  {
    id: '6', brand: 'Toyota', model: 'Corolla', version: 'XEi 2.0 Flex',
    year: 2024, image: img.login, price: 149990, rating: 4.7,
    fuel: 'Flex (gasolina/etanol)', power: '177 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '213 Nm', engineType: '2.0 Flex Dynamic Force', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4640, largura: 1780, altura: 1435, entre_eixos: 2700, portaMalas: 470 },
    weight: 1350,
    urbanConsumption: '12,5 km/l', highwayConsumption: '15,0 km/l',
    acceleration: '9,2 s', topSpeed: '190 km/h',
    safetyFeatures: ['7 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Toyota Safety Sense', 'Câmera de ré', 'Alerta de fadiga'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '3 anos' }],
    dataSources: ['Toyota Brasil', 'Fabricante', 'Inmetro'],
    confidenceStatus: 'verificado',
  },
  {
    id: '7', brand: 'Honda', model: 'HR-V', version: 'Touring Hybrid',
    year: 2024, image: img.home, price: 179990, rating: 4.6,
    fuel: 'Híbrido (flex + elétrico)', power: '131 cv', bodyType: 'SUV', transmission: 'CVT',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '253 Nm', engineType: '1.5 Flex + Motor elétrico', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4348, largura: 1790, altura: 1588, entre_eixos: 2610, portaMalas: 437 },
    weight: 1393,
    urbanConsumption: '15,3 km/l', highwayConsumption: '17,5 km/l',
    acceleration: '9,4 s', topSpeed: '175 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Honda Sensing', 'Controle de estabilidade', 'Câmera traseira', 'Frenagem autônoma'],
    otherAttributes: [{ label: 'Carroceria', value: 'SUV' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '3 anos' }],
    dataSources: ['Honda Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '8', brand: 'Volkswagen', model: 'Polo', version: 'GTS 1.4 TSI',
    year: 2024, image: img.register, price: 109990, rating: 4.5,
    fuel: 'Gasolina', power: '128 cv', bodyType: 'Hatch', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '200 Nm', engineType: '1.4 TSI', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4053, largura: 1751, altura: 1461, entre_eixos: 2548, portaMalas: 280 },
    weight: 1178,
    urbanConsumption: '11,8 km/l', highwayConsumption: '14,5 km/l',
    acceleration: '8,5 s', topSpeed: '205 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade (ESC)', 'Câmera de ré', 'Sistema de aviso de fadiga'],
    otherAttributes: [{ label: 'Carroceria', value: 'Hatchback' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '3 anos' }],
    dataSources: ['Volkswagen Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '9', brand: 'Hyundai', model: 'HB20S', version: 'Diamond 1.0 T',
    year: 2024, image: img.login, price: 89990, rating: 4.4,
    fuel: 'Flex (gasolina/etanol)', power: '120 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '172 Nm', engineType: '1.0 Turbo GDI Flex', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4375, largura: 1700, altura: 1474, entre_eixos: 2530, portaMalas: 475 },
    weight: 1157,
    urbanConsumption: '12,2 km/l', highwayConsumption: '15,1 km/l',
    acceleration: '9,8 s', topSpeed: '175 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Câmera de ré', 'Alerta de faixa'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan compacto' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '5 anos' }],
    dataSources: ['Hyundai Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '10', brand: 'Fiat', model: 'Pulse', version: 'Impetus T200 CVT',
    year: 2024, image: img.home, price: 119990, rating: 4.3,
    fuel: 'Flex (gasolina/etanol)', power: '130 cv', bodyType: 'SUV', transmission: 'CVT',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '200 Nm', engineType: '1.3 Turbo 200 Flex', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4227, largura: 1762, altura: 1609, entre_eixos: 2520, portaMalas: 370 },
    weight: 1269,
    urbanConsumption: '10,5 km/l', highwayConsumption: '13,2 km/l',
    acceleration: '10,0 s', topSpeed: '170 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Câmera de ré'],
    otherAttributes: [{ label: 'Carroceria', value: 'SUV compacto' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '3 anos' }],
    dataSources: ['Fiat Brasil', 'Fabricante'],
    confidenceStatus: 'parcial',
  },
];

export const electricVehicles: VehicleMock[] = [
  {
    id: '11', brand: 'BYD', model: 'Dolphin', version: 'Plus 60 kWh',
    year: 2024, image: img.register, price: 149990, rating: 4.8,
    fuel: 'Elétrico', power: '204 cv', bodyType: 'Hatch', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
    torque: '310 Nm', engineType: 'Motor elétrico (MEB)', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4290, largura: 1770, altura: 1570, entre_eixos: 2700, portaMalas: 345 },
    weight: 1590,
    urbanConsumption: '10,8 km/kWh', highwayConsumption: '9,2 km/kWh',
    acceleration: '7,0 s', topSpeed: '160 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Frenagem autônoma de emergência', 'Câmera de ré', 'Alerta de ponto cego'],
    otherAttributes: [{ label: 'Carroceria', value: 'Hatchback' }, { label: 'Bateria', value: '60,4 kWh' }, { label: 'Autonomia WLTP', value: '340 km' }, { label: 'Carregamento rápido', value: '60 kW (DC)' }],
    dataSources: ['BYD Brasil', 'Fabricante', 'Inmetro'],
    confidenceStatus: 'verificado',
  },
  {
    id: '12', brand: 'Volvo', model: 'EX30', version: 'Single Motor',
    year: 2024, image: img.home, price: 249990, rating: 4.9,
    fuel: 'Elétrico', power: '272 cv', bodyType: 'SUV', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true, isFeatured: true,
    torque: '343 Nm', engineType: 'Motor elétrico (PMSM)', traction: 'Traseira (RWD)',
    dimensions: { comprimento: 4233, largura: 1837, altura: 1550, entre_eixos: 2650, portaMalas: 318 },
    weight: 1747,
    urbanConsumption: '11,5 km/kWh', highwayConsumption: '9,8 km/kWh',
    acceleration: '5,7 s', topSpeed: '180 km/h',
    safetyFeatures: ['8 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Piloto automático adaptativo', 'Assistente de estacionamento', 'Câmera 360°', 'Frenagem autônoma'],
    otherAttributes: [{ label: 'Carroceria', value: 'SUV compacto' }, { label: 'Bateria', value: '51 kWh' }, { label: 'Autonomia WLTP', value: '344 km' }, { label: 'Carregamento rápido', value: '150 kW (DC)' }],
    dataSources: ['Volvo Cars Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '13', brand: 'BYD', model: 'Seal', version: 'AWD 82 kWh',
    year: 2024, image: img.login, price: 219990, rating: 4.7,
    fuel: 'Elétrico', power: '313 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
    torque: '670 Nm', engineType: 'Dual Motor elétrico', traction: 'Integral (AWD)',
    dimensions: { comprimento: 4800, largura: 1875, altura: 1460, entre_eixos: 2920, portaMalas: 400 },
    weight: 2150,
    urbanConsumption: '9,5 km/kWh', highwayConsumption: '8,2 km/kWh',
    acceleration: '3,8 s', topSpeed: '180 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Câmera de ré', 'Piloto automático adaptativo', 'Frenagem autônoma'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Bateria', value: '82,56 kWh' }, { label: 'Autonomia WLTP', value: '520 km' }, { label: 'Carregamento rápido', value: '150 kW (DC)' }],
    dataSources: ['BYD Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '14', brand: 'GWM', model: 'ORA 03', version: 'Premium 63 kWh',
    year: 2024, image: img.register, price: 179990, rating: 4.5,
    fuel: 'Elétrico', power: '204 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
    torque: '310 Nm', engineType: 'Motor elétrico', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4614, largura: 1825, altura: 1496, entre_eixos: 2700, portaMalas: 228 },
    weight: 1815,
    urbanConsumption: '10,2 km/kWh', highwayConsumption: '8,8 km/kWh',
    acceleration: '8,0 s', topSpeed: '150 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Câmera de ré', 'Alerta de colisão frontal'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Bateria', value: '63 kWh' }, { label: 'Autonomia WLTP', value: '420 km' }, { label: 'Carregamento rápido', value: '80 kW (DC)' }],
    dataSources: ['GWM Brasil', 'Fabricante'],
    confidenceStatus: 'parcial',
  },
  {
    id: '15', brand: 'Tesla', model: 'Model 3', version: 'Long Range AWD',
    year: 2024, image: img.home, price: 299990, rating: 4.9,
    fuel: 'Elétrico', power: '286 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true, isFeatured: true,
    torque: '493 Nm', engineType: 'Dual Motor elétrico', traction: 'Integral (AWD)',
    dimensions: { comprimento: 4694, largura: 1849, altura: 1443, entre_eixos: 2875, portaMalas: 594 },
    weight: 1828,
    urbanConsumption: '10,8 km/kWh', highwayConsumption: '9,5 km/kWh',
    acceleration: '4,2 s', topSpeed: '233 km/h',
    safetyFeatures: ['8 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Piloto automático avançado', 'Câmera 360°', 'Frenagem autônoma', 'Alerta de ponto cego'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Bateria', value: '82 kWh' }, { label: 'Autonomia EPA', value: '602 km' }, { label: 'Carregamento Supercharger', value: '250 kW' }],
    dataSources: ['Tesla Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
];

export const ALL_VEHICLES: VehicleMock[] = [
  ...popularVehicles,
  ...favoriteVehicles,
  ...electricVehicles,
];
