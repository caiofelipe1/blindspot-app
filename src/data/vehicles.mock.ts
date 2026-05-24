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
    id: '1', brand: 'Ford', model: 'Ranger Raptor', version: 'Ranger Raptor 2.0 EcoBlue Biturbo',
    year: 2024, image: img.home, price: 379990, rating: 4.9,
    fuel: 'Diesel', power: '210 cv', bodyType: 'Picape', transmission: 'Automático 10 vel.',
    category: 'popular', isFavorite: false, isElectric: false, isFeatured: true,
    torque: '500 Nm', engineType: '2.0 EcoBlue Biturbo Diesel', traction: '4WD com 6 modos de direção',
    dimensions: { comprimento: 5362, largura: 1860, altura: 1912, entre_eixos: 3270, portaMalas: 1560 },
    weight: 2340,
    urbanConsumption: '9,5 km/l', highwayConsumption: '12,0 km/l',
    acceleration: '10,0 s', topSpeed: '180 km/h',
    safetyFeatures: [
      '7 airbags', 'ABS + EBD', 'Controle de estabilidade (AdvanceTrac)',
      'Pre-Collision Assist com frenagem automática', 'Lane Keeping Alert',
      'Câmera de ré', 'Sensores de estacionamento', 'Cruise Control adaptativo',
    ],
    otherAttributes: [
      { label: 'Carroceria', value: 'Picape dupla cabine' },
      { label: 'Assentos', value: '5' },
      { label: 'Capacidade de carga', value: '620 kg' },
      { label: 'Modos de direção', value: 'Normal, Sport, Lama/Areia, Rocha, Baja, Neve' },
      { label: 'Garantia', value: '3 anos' },
    ],
    dataSources: ['Ford Brasil', 'Ficha técnica oficial Ford 2024', 'Inmetro'],
    confidenceStatus: 'verificado',
  },
  {
    id: '2', brand: 'Toyota', model: 'Hilux', version: 'GR Sport 2.8 TDI 4x4 AT',
    year: 2024, image: img.register, price: 299990, rating: 4.8,
    fuel: 'Diesel', power: '204 cv', bodyType: 'Picape', transmission: 'Automático 6 vel.',
    category: 'popular', isFavorite: false, isElectric: false, isFeatured: true,
    torque: '500 Nm', engineType: '2.8 GD-6 Diesel', traction: '4WD com bloqueio de diferencial',
    dimensions: { comprimento: 5335, largura: 1855, altura: 1815, entre_eixos: 3085, portaMalas: 1480 },
    weight: 2065,
    urbanConsumption: '10,5 km/l', highwayConsumption: '13,5 km/l',
    acceleration: '9,6 s', topSpeed: '175 km/h',
    safetyFeatures: [
      '7 airbags', 'ABS + EBD', 'Controle de estabilidade (VSC)',
      'Toyota Safety Sense', 'Câmera de ré 360°', 'Alerta de ponto cego',
      'Assistência de partida em subida',
    ],
    otherAttributes: [
      { label: 'Carroceria', value: 'Picape dupla cabine' },
      { label: 'Assentos', value: '5' },
      { label: 'Capacidade de carga', value: '845 kg' },
      { label: 'Garantia', value: '3 anos' },
    ],
    dataSources: ['Toyota Brasil', 'Fabricante', 'Inmetro'],
    confidenceStatus: 'verificado',
  },
  {
    id: '3', brand: 'Volkswagen', model: 'Amarok', version: 'Highline V6 3.0 TDI 4Motion',
    year: 2024, image: img.login, price: 399990, rating: 4.7,
    fuel: 'Diesel', power: '258 cv', bodyType: 'Picape', transmission: 'Automático 8 vel.',
    category: 'popular', isFavorite: false, isElectric: false,
    torque: '580 Nm', engineType: '3.0 TDI V6 Biturbo', traction: '4Motion (4WD permanente)',
    dimensions: { comprimento: 5350, largura: 1954, altura: 1834, entre_eixos: 3098, portaMalas: 1495 },
    weight: 2330,
    urbanConsumption: '9,8 km/l', highwayConsumption: '12,5 km/l',
    acceleration: '7,9 s', topSpeed: '202 km/h',
    safetyFeatures: [
      '8 airbags', 'ABS + EBD', 'Controle de estabilidade (ESC)',
      'Câmera de ré', 'Alerta de ponto cego', 'Frenagem autônoma de emergência',
      'Assistência de partida em subida',
    ],
    otherAttributes: [
      { label: 'Carroceria', value: 'Picape dupla cabine' },
      { label: 'Assentos', value: '5' },
      { label: 'Capacidade de carga', value: '1.012 kg' },
      { label: 'Garantia', value: '3 anos' },
    ],
    dataSources: ['Volkswagen Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '4', brand: 'Mitsubishi', model: 'L200 Triton', version: 'Sport HPE-S 2.4 Diesel AT',
    year: 2024, image: img.home, price: 249990, rating: 4.5,
    fuel: 'Diesel', power: '181 cv', bodyType: 'Picape', transmission: 'Automático 6 vel.',
    category: 'popular', isFavorite: false, isElectric: false,
    torque: '430 Nm', engineType: '2.4 MIVEC Diesel Turbo', traction: '4WD Eletrônico Super Select II',
    dimensions: { comprimento: 5295, largura: 1815, altura: 1780, entre_eixos: 3000, portaMalas: 1420 },
    weight: 1975,
    urbanConsumption: '10,8 km/l', highwayConsumption: '13,5 km/l',
    acceleration: '11,0 s', topSpeed: '170 km/h',
    safetyFeatures: [
      '7 airbags', 'ABS + EBD', 'Controle de estabilidade',
      'Câmera de ré', 'Assistência de partida em subida', 'Monitor de pressão dos pneus',
    ],
    otherAttributes: [
      { label: 'Carroceria', value: 'Picape dupla cabine' },
      { label: 'Assentos', value: '5' },
      { label: 'Capacidade de carga', value: '905 kg' },
      { label: 'Garantia', value: '5 anos' },
    ],
    dataSources: ['Mitsubishi Brasil', 'Fabricante'],
    confidenceStatus: 'verificado',
  },
  {
    id: '5', brand: 'Chevrolet', model: 'S10', version: 'High Country 2.8 Diesel AT 4x4',
    year: 2024, image: img.register, price: 289990, rating: 4.6,
    fuel: 'Diesel', power: '200 cv', bodyType: 'Picape', transmission: 'Automático 6 vel.',
    category: 'popular', isFavorite: false, isElectric: false,
    torque: '500 Nm', engineType: '2.8 Turbo Diesel Duramax', traction: '4WD com bloqueio de diferencial',
    dimensions: { comprimento: 5393, largura: 1843, altura: 1781, entre_eixos: 3100, portaMalas: 1530 },
    weight: 2080,
    urbanConsumption: '10,2 km/l', highwayConsumption: '13,0 km/l',
    acceleration: '10,5 s', topSpeed: '175 km/h',
    safetyFeatures: [
      '6 airbags', 'ABS + EBD', 'Controle de estabilidade (StabiliTrak)',
      'Câmera de ré', 'Alerta de colisão frontal', 'Assistência de partida em subida',
    ],
    otherAttributes: [
      { label: 'Carroceria', value: 'Picape dupla cabine' },
      { label: 'Assentos', value: '5' },
      { label: 'Capacidade de carga', value: '980 kg' },
      { label: 'Garantia', value: '3 anos' },
    ],
    dataSources: ['Chevrolet Brasil', 'Fabricante', 'Inmetro'],
    confidenceStatus: 'verificado',
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
