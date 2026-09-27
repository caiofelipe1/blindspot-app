import type { ImageSourcePropType } from 'react-native';

const VI: Record<string, ImageSourcePropType> = {
  ranger_raptor: require('../../assets/images/vehicles/ranger_raptor.jpg'),
  hilux:         require('../../assets/images/vehicles/hilux.jpg'),
  amarok:        require('../../assets/images/vehicles/amarok.jpg'),
  l200:          require('../../assets/images/vehicles/l200.jpg'),
  s10:           require('../../assets/images/vehicles/s10.jpg'),
  corolla:       require('../../assets/images/vehicles/corolla.jpg'),
  hrv:           require('../../assets/images/vehicles/hrv.jpg'),
  polo:          require('../../assets/images/vehicles/polo.jpg'),
  hb20:          require('../../assets/images/vehicles/hb20.jpg'),
  pulse:         require('../../assets/images/vehicles/pulse.jpg'),
  dolphin:       require('../../assets/images/vehicles/dolphin.jpg'),
  ex30:          require('../../assets/images/vehicles/ex30.jpg'),
  seal:          require('../../assets/images/vehicles/seal.jpg'),
  ora03:         require('../../assets/images/vehicles/ora03.jpg'),
  model3:        require('../../assets/images/vehicles/model3.jpg'),
  duster:        require('../../assets/images/vehicles/duster.jpg'),
  compass:       require('../../assets/images/vehicles/compass.jpg'),
};

export interface VehicleMock {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  image: ImageSourcePropType;
  price?: number;
  priceReference?: string;
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
    portaMalas?: number;
  };
  weight?: number;
  urbanConsumption?: string;
  highwayConsumption?: string;
  acceleration?: string;
  topSpeed?: string;
  safetyFeatures?: string[];
  otherAttributes?: { label: string; value: string }[];
  dataSources?: string[];
  sourceLinks?: { title: string; url: string }[];
  dataNotes?: string[];
  confidenceStatus?: 'verificado' | 'parcial' | 'nao_verificado';
}

export const popularVehicles: VehicleMock[] = [
  {
    id: '1', brand: 'Ford', model: 'Ranger Raptor', version: 'Ranger Raptor 3.0 V6 Biturbo 4WD',
    year: 2025, image: VI.ranger_raptor, price: 499000, rating: 4.9,
    priceReference: 'Histórico — anúncio reproduzido no slide 15 do desafio Ford; data do anúncio não informada',
    fuel: 'Gasolina', power: '397 cv', bodyType: 'Picape', transmission: 'Automático de 10 velocidades, E-Shifter e paddle shifters',
    category: 'popular', isFavorite: false, isElectric: false, isFeatured: true,
    torque: '583 Nm', engineType: 'V6 3.0L Nano biturbo', traction: '4WD',
    dimensions: { comprimento: 5381, largura: 2208, altura: 1922, entre_eixos: 3270 },
    weight: 2415,
    acceleration: '5,8 s',
    safetyFeatures: [
      '7 airbags (frontais, laterais, cortinas e joelho)',
      'Controle eletrônico de estabilidade',
      'Assistente autônomo de frenagem (com detecção de pedestres)',
      'Assistente autônomo de frenagem em marcha à ré',
      'Piloto automático adaptativo (ACC) com Stop & Go',
      'Piloto automático off-road (Trail Control)',
      'Sistema de monitoramento de ponto cego (BLIS)',
      'Alerta de tráfego cruzado em marcha à ré',
      'Câmera 360°',
      'Sensor de estacionamento dianteiro e traseiro',
      'Assistente de manobras evasivas',
      'Assistente de permanência e centralização em faixa',
      'Frenagem pós-colisão',
      'Farol alto automático',
    ],
    otherAttributes: [
      { label: 'Carroceria', value: 'Picape dupla cabine' },
      { label: 'Assentos', value: '5' },
      { label: 'Capacidade de carga', value: '715 kg' },
      { label: 'Tanque', value: '77 L' },
      { label: 'Capacidade de imersão', value: '850 mm' },
      { label: 'Suspensão', value: 'FOX 2.5" Live Valve Racing' },
      { label: 'Rotação da potência máxima', value: '5.650 rpm' },
      { label: 'Rotação do torque máximo', value: '3.500 rpm' },
      { label: 'Faróis', value: 'Matrix LED' },
      { label: 'Rodas', value: 'Liga leve de 17 polegadas' },
      { label: 'Pneus', value: '285/70 R17 AT (General Grabber)' },
      { label: 'Modos de direção', value: 'Normal, Conforto, Sport, Off-Road' },
      { label: 'Modos de escapamento', value: 'Silencioso, Normal, Sport, Baja' },
      { label: 'Diferencial', value: 'Dianteiro e traseiro blocante' },
      { label: 'Modos de condução', value: 'Normal, Esportivo, Escorregadio, Lama/Terra, Areia, Baja, Rock Crawl' },
      { label: 'Modos de amortecedor', value: 'Normal, Sport, Off-Road' },
      { label: 'Som', value: 'Bang & Olufsen (8 alto-falantes)' },
      { label: 'Garantia', value: '5 anos sem limite de km, com exceções por componente e modalidade de venda (catálogo MY2025)' },
    ],
    dataSources: ['Ford FIAP 2026 — apresentação do desafio, slides 13 e 15', 'Ford Brasil — catálogo Ranger Raptor MY2025 (02/2025), páginas 1–2'],
    dataNotes: [
      'Aceleração de 5,8 s e rotações de potência/torque conforme o slide 13 do desafio.',
      'Modos de direção: o catálogo MY2025 inclui Normal, Conforto, Sport e Off-Road; o slide do desafio lista somente Normal, Sport e Conforto.',
      'Modos de amortecedor: o catálogo MY2025 lista Normal, Sport e Off-Road; o slide do desafio lista Normal, Sport e Baja. A ficha mantém o catálogo MY2025.',
      'Preço de referência histórico: a partir de R$ 499.000 no anúncio reproduzido no slide 15. O slide 13 contém o texto incompleto “R$499.00”. Não é uma cotação atual nem o preço FIPE.',
      'Largura de 2.208 mm inclui os espelhos. Consumo, velocidade máxima e volume da caçamba não foram confirmados nos documentos consultados.',
    ],
    confidenceStatus: 'parcial',
  },
  {
    id: '2', brand: 'Toyota', model: 'Hilux', version: 'GR Sport 2.8 TDI 4x4 AT',
    year: 2024, image: VI.hilux, rating: 4.8,
    fuel: 'Diesel', power: '224 cv', bodyType: 'Picape', transmission: 'Automático 6 vel.',
    category: 'popular', isFavorite: false, isElectric: false, isFeatured: true,
    torque: '539,4 Nm', engineType: '2.8 GD-6 Diesel', traction: '4WD com bloqueio de diferencial',
    dataSources: ['Toyota — Hilux GR-Sport, linha 2023'],
    sourceLinks: [{ title: 'Toyota — motorização GR-Sport', url: 'https://www.toyotacomunica.com.br/toyota-do-brasil-anuncia-chegada-da-linha-2023-para-hilux-e-sw4/' }],
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
    dataNotes: ['Potência e torque da GR-Sport corrigidos com base na linha 2023: 224 cv e 55 kgfm (539,4 Nm). A referência não certifica toda a ficha MY2024; dimensões, equipamentos e demais campos ainda precisam de conferência específica.'],
    confidenceStatus: 'parcial',
  },
  {
    id: '3', brand: 'Volkswagen', model: 'Amarok', version: 'Highline V6 3.0 TDI 4Motion',
    year: 2024, image: VI.amarok, rating: 4.7,
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
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '4', brand: 'Mitsubishi', model: 'L200 Triton', version: 'Sport HPE-S 2.4 Diesel AT',
    year: 2024, image: VI.l200, rating: 4.5,
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
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '16', brand: 'Renault', model: 'Duster', version: 'Iconic 1.3 TCe CVT',
    year: 2024, image: VI.duster, rating: 4.4,
    fuel: 'Flex (gasolina/etanol)', power: '130 cv', bodyType: 'SUV', transmission: 'CVT',
    category: 'popular', isFavorite: false, isElectric: false,
    torque: '240 Nm', engineType: '1.3 TCe Turbo Flex', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4341, largura: 1804, altura: 1694, entre_eixos: 2673, portaMalas: 472 },
    weight: 1313,
    urbanConsumption: '11,4 km/l', highwayConsumption: '13,8 km/l',
    acceleration: '9,9 s', topSpeed: '178 km/h',
    safetyFeatures: [
      '6 airbags', 'ABS + EBD', 'Controle de estabilidade (ESC)',
      'Câmera de ré', 'Alerta de ponto cego', 'Assistência de partida em subida',
    ],
    otherAttributes: [
      { label: 'Carroceria', value: 'SUV compacto' },
      { label: 'Assentos', value: '5' },
      { label: 'Tanque', value: '50 L' },
      { label: 'Garantia', value: '3 anos' },
    ],
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '17', brand: 'Jeep', model: 'Compass', version: 'Longitude 1.3 T270 Flex AT6',
    year: 2024, image: VI.compass, rating: 4.5,
    fuel: 'Flex (gasolina/etanol)', power: '185 cv', bodyType: 'SUV', transmission: 'Automático 6 vel.',
    category: 'popular', isFavorite: false, isElectric: false,
    torque: '270 Nm', engineType: '1.3 Turbo Flex T270', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4405, largura: 1820, altura: 1640, entre_eixos: 2636, portaMalas: 516 },
    weight: 1520,
    urbanConsumption: '10,8 km/l', highwayConsumption: '13,2 km/l',
    acceleration: '9,1 s', topSpeed: '190 km/h',
    safetyFeatures: [
      '6 airbags', 'ABS + EBD', 'Controle de estabilidade (ESC)',
      'Câmera de ré 180°', 'Sensores dianteiros e traseiros',
      'Alerta de saída de faixa', 'Monitoramento de ponto cego',
    ],
    otherAttributes: [
      { label: 'Carroceria', value: 'SUV compacto' },
      { label: 'Assentos', value: '5' },
      { label: 'Tanque', value: '54 L' },
      { label: 'Garantia', value: '3 anos' },
    ],
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '5', brand: 'Chevrolet', model: 'S10', version: 'High Country 2.8 Diesel AT 4x4',
    year: 2024, image: VI.s10, rating: 4.6,
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
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
];

export const favoriteVehicles: VehicleMock[] = [
  {
    id: '6', brand: 'Toyota', model: 'Corolla', version: 'XEi 2.0 Flex',
    year: 2024, image: VI.corolla, rating: 4.7,
    fuel: 'Flex (gasolina/etanol)', power: '177 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '213 Nm', engineType: '2.0 Flex Dynamic Force', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4640, largura: 1780, altura: 1435, entre_eixos: 2700, portaMalas: 470 },
    weight: 1350,
    urbanConsumption: '12,5 km/l', highwayConsumption: '15,0 km/l',
    acceleration: '9,2 s', topSpeed: '190 km/h',
    safetyFeatures: ['7 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Toyota Safety Sense', 'Câmera de ré', 'Alerta de fadiga'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '3 anos' }],
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '7', brand: 'Honda', model: 'HR-V', version: 'Touring 1.5 Turbo Flex CVT',
    year: 2024, image: VI.hrv, rating: 4.6,
    fuel: 'Flex (gasolina/etanol)', power: '177 cv', bodyType: 'SUV', transmission: 'CVT',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '240,3 Nm', engineType: '1.5 DI VTEC Turbo Flex', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4348, largura: 1790, altura: 1588, entre_eixos: 2610, portaMalas: 437 },
    weight: 1393,
    urbanConsumption: '11,3 km/l (gasolina) / 7,9 km/l (etanol)', highwayConsumption: '12,6 km/l (gasolina) / 8,8 km/l (etanol)',
    acceleration: '9,4 s', topSpeed: '175 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Honda Sensing', 'Controle de estabilidade', 'Câmera traseira', 'Frenagem autônoma'],
    otherAttributes: [{ label: 'Carroceria', value: 'SUV' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '3 anos' }],
    dataSources: ['Honda Brasil — lançamento do New HR-V Advance/Touring (2022)'],
    sourceLinks: [{ title: 'Honda — motor e consumo do HR-V Touring', url: 'https://saladeimprensa.honda.com.br/releases/honda-inicia-venda-do-new-hr-v-nas-versoes-advance-e-touring-com-o-inedito-motor-15-di' }],
    dataNotes: ['Revisão parcial do conjunto mecânico: motor, combustível, potência e consumo conforme lançamento brasileiro da geração. Torque convertido de 24,5 kgfm para 240,3 Nm. O documento não é uma ficha específica MY2024; demais campos ainda não foram conferidos para esse ano.'],
    confidenceStatus: 'parcial',
  },
  {
    id: '8', brand: 'Volkswagen', model: 'Polo', version: 'GTS 1.4 TSI',
    year: 2024, image: VI.polo, rating: 4.5,
    fuel: 'Flex (gasolina/etanol)', power: '150 cv', bodyType: 'Hatch', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '250,1 Nm', engineType: '1.4 TSI', traction: 'Dianteira (FWD)',
    dataSources: ['Volkswagen — retrospectiva de lançamentos 2023, Polo GTS'],
    sourceLinks: [{ title: 'Volkswagen — motor 250 TSI do Polo GTS', url: 'https://newsroom-br.itd.vw.com.br/news/2018' }],
    dimensions: { comprimento: 4053, largura: 1751, altura: 1461, entre_eixos: 2548, portaMalas: 280 },
    weight: 1178,
    urbanConsumption: '11,8 km/l', highwayConsumption: '14,5 km/l',
    acceleration: '8,5 s', topSpeed: '205 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade (ESC)', 'Câmera de ré', 'Sistema de aviso de fadiga'],
    otherAttributes: [{ label: 'Carroceria', value: 'Hatchback' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '3 anos' }],
    dataNotes: ['Potência e torque corrigidos conforme Volkswagen, lançamento 2023: 150 cv e 25,5 kgfm (250,1 Nm). A referência não certifica a ficha inteira MY2024; demais campos pendentes.'],
    confidenceStatus: 'parcial',
  },
  {
    id: '9', brand: 'Hyundai', model: 'HB20S', version: 'Diamond 1.0 T',
    year: 2024, image: VI.hb20, rating: 4.4,
    fuel: 'Flex (gasolina/etanol)', power: '120 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '172 Nm', engineType: '1.0 Turbo GDI Flex', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4375, largura: 1700, altura: 1474, entre_eixos: 2530, portaMalas: 475 },
    weight: 1157,
    urbanConsumption: '12,2 km/l', highwayConsumption: '15,1 km/l',
    acceleration: '9,8 s', topSpeed: '175 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Câmera de ré', 'Alerta de faixa'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan compacto' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '5 anos' }],
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '10', brand: 'Fiat', model: 'Pulse', version: 'Impetus T200 CVT',
    year: 2024, image: VI.pulse, price: 133490, priceReference: 'Histórico — lançamento MY24, Fiat, 24/08/2023', rating: 4.3,
    fuel: 'Flex (gasolina/etanol)', power: '125 cv (gasolina) / 130 cv (etanol)', bodyType: 'SUV', transmission: 'CVT',
    category: 'favorite', isFavorite: true, isElectric: false,
    torque: '200 Nm', engineType: '1.0 Turbo 200 Flex', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4099, largura: 1774, altura: 1579, entre_eixos: 2532, portaMalas: 370 },
    weight: 1237,
    urbanConsumption: '12 km/l (gasolina) / 8,5 km/l (etanol)', highwayConsumption: '14,6 km/l (gasolina) / 10,2 km/l (etanol)',
    acceleration: '9,7 s (gasolina) / 9,4 s (etanol)', topSpeed: '187 km/h (gasolina) / 189 km/h (etanol)',
    safetyFeatures: ['ABS + EBD', 'Controle de estabilidade'],
    otherAttributes: [{ label: 'Carroceria', value: 'SUV compacto' }, { label: 'Assentos', value: '5' }, { label: 'Garantia', value: '3 anos' }],
    dataSources: ['Fiat — ficha técnica Pulse Impetus Turbo 200 MY24, páginas 1–2'],
    sourceLinks: [
      { title: 'Fiat — ficha técnica Impetus MY24 (PDF)', url: 'https://www.media.stellantis.com/br-pt/download-model-document/267?v=1737122554' },
      { title: 'Fiat — preços de lançamento MY24, 24/08/2023', url: 'https://www.media.stellantis.com/br-pt/fiat/press/errata-fiat-pulse-ganha-versao-s-design-e-pulse-abarth-fica-mais-sofisticado-na-linha-2024' },
    ],
    dataNotes: ['Motor, potência por combustível, torque, dimensões, peso, consumo e desempenho conferidos na ficha MY24. Lista de segurança não é exaustiva; itens não confirmados foram retirados. Garantia ainda não validada.'],
    confidenceStatus: 'parcial',
  },
];

export const electricVehicles: VehicleMock[] = [
  {
    id: '11', brand: 'BYD', model: 'Dolphin', version: 'Plus 60 kWh',
    year: 2024, image: VI.dolphin, rating: 4.8,
    fuel: 'Elétrico', power: '204 cv', bodyType: 'Hatch', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
    torque: '310 Nm', engineType: 'Motor elétrico', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4290, largura: 1770, altura: 1570, entre_eixos: 2700, portaMalas: 345 },
    weight: 1590,
    urbanConsumption: '10,8 km/kWh', highwayConsumption: '9,2 km/kWh',
    acceleration: '7,0 s', topSpeed: '160 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Frenagem autônoma de emergência', 'Câmera de ré', 'Alerta de ponto cego'],
    otherAttributes: [{ label: 'Carroceria', value: 'Hatchback' }, { label: 'Bateria', value: '60,4 kWh' }, { label: 'Autonomia WLTP', value: '340 km' }, { label: 'Carregamento rápido', value: '60 kW (DC)' }],
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '12', brand: 'Volvo', model: 'EX30', version: 'Single Motor',
    year: 2024, image: VI.ex30, rating: 4.9,
    fuel: 'Elétrico', power: '272 cv', bodyType: 'SUV', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true, isFeatured: true,
    torque: '343 Nm', engineType: 'Motor elétrico (PMSM)', traction: 'Traseira (RWD)',
    dimensions: { comprimento: 4233, largura: 1837, altura: 1550, entre_eixos: 2650, portaMalas: 318 },
    weight: 1747,
    urbanConsumption: '11,5 km/kWh', highwayConsumption: '9,8 km/kWh',
    acceleration: '5,7 s', topSpeed: '180 km/h',
    safetyFeatures: ['8 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Piloto automático adaptativo', 'Assistente de estacionamento', 'Câmera 360°', 'Frenagem autônoma'],
    otherAttributes: [{ label: 'Carroceria', value: 'SUV compacto' }, { label: 'Bateria', value: '51 kWh' }, { label: 'Autonomia WLTP', value: '344 km' }, { label: 'Carregamento rápido', value: '150 kW (DC)' }],
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '13', brand: 'BYD', model: 'Seal', version: 'AWD 82 kWh',
    year: 2024, image: VI.seal, rating: 4.7,
    fuel: 'Elétrico', power: '531 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
    torque: '670 Nm', engineType: 'Dual Motor elétrico', traction: 'Integral (AWD)',
    dataSources: ['BYD — lançamento europeu do Seal AWD, 14/04/2023; BYD Brasil — tecnologia CTB'],
    sourceLinks: [
      { title: 'BYD — variantes Seal RWD e AWD (2023)', url: 'https://www.byd.com/eu/news-list/BYD_Introduces_Two_New_Full-electric_Vehicles_in_Europe_BYD_DOLPHIN_and_BYD_SEAL' },
      { title: 'BYD Brasil — potência do Seal', url: 'https://www.byd.com/br/tecnologia-byd-cell-to-body' },
    ],
    dimensions: { comprimento: 4800, largura: 1875, altura: 1460, entre_eixos: 2920, portaMalas: 400 },
    weight: 2150,
    urbanConsumption: '9,5 km/kWh', highwayConsumption: '8,2 km/kWh',
    acceleration: '3,8 s', topSpeed: '180 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Câmera de ré', 'Piloto automático adaptativo', 'Frenagem autônoma'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Bateria', value: '82,56 kWh' }, { label: 'Autonomia WLTP', value: '520 km' }, { label: 'Carregamento rápido', value: '150 kW (DC)' }],
    dataNotes: ['Potência combinada corrigida para 531 cv na configuração AWD; 313 cv não representava a potência total. Referências de geração e configuração, sem certificação integral MY2024 Brasil. Torque, equipamentos e demais campos ainda pendentes de conferência.'],
    confidenceStatus: 'parcial',
  },
  {
    id: '14', brand: 'GWM', model: 'ORA 03', version: 'Premium 63 kWh',
    year: 2024, image: VI.ora03, rating: 4.5,
    fuel: 'Elétrico', power: '204 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
    torque: '310 Nm', engineType: 'Motor elétrico', traction: 'Dianteira (FWD)',
    dimensions: { comprimento: 4614, largura: 1825, altura: 1496, entre_eixos: 2700, portaMalas: 228 },
    weight: 1815,
    urbanConsumption: '10,2 km/kWh', highwayConsumption: '8,8 km/kWh',
    acceleration: '8,0 s', topSpeed: '150 km/h',
    safetyFeatures: ['6 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Câmera de ré', 'Alerta de colisão frontal'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Bateria', value: '63 kWh' }, { label: 'Autonomia WLTP', value: '420 km' }, { label: 'Carregamento rápido', value: '80 kW (DC)' }],
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
  {
    id: '15', brand: 'Tesla', model: 'Model 3', version: 'Long Range AWD',
    year: 2024, image: VI.model3, rating: 4.9,
    fuel: 'Elétrico', power: '286 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true, isFeatured: true,
    torque: '493 Nm', engineType: 'Dual Motor elétrico', traction: 'Integral (AWD)',
    dimensions: { comprimento: 4694, largura: 1849, altura: 1443, entre_eixos: 2875, portaMalas: 594 },
    weight: 1828,
    urbanConsumption: '10,8 km/kWh', highwayConsumption: '9,5 km/kWh',
    acceleration: '4,2 s', topSpeed: '233 km/h',
    safetyFeatures: ['8 airbags', 'ABS + EBD', 'Controle de estabilidade', 'Piloto automático avançado', 'Câmera 360°', 'Frenagem autônoma', 'Alerta de ponto cego'],
    otherAttributes: [{ label: 'Carroceria', value: 'Sedan' }, { label: 'Bateria', value: '82 kWh' }, { label: 'Autonomia EPA', value: '602 km' }, { label: 'Carregamento Supercharger', value: '250 kW' }],
    dataNotes: ['Especificações do catálogo demonstrativo ainda não conferidas com documentação desta versão e ano.'],
    confidenceStatus: 'nao_verificado',
  },
];

export const ALL_VEHICLES: VehicleMock[] = [
  ...popularVehicles,
  ...favoriteVehicles,
  ...electricVehicles,
];
