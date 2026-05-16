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
    fuel: 'Combustão', power: '510 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'popular', isFavorite: false, isElectric: false, isFeatured: true,
  },
  {
    id: '2', brand: 'Mercedes', model: 'AMG C63', version: 'C63 S E-Performance',
    year: 2024, image: img.register, price: 799000, rating: 4.8,
    fuel: 'Combustão', power: '680 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'popular', isFavorite: false, isElectric: false,
  },
  {
    id: '3', brand: 'Audi', model: 'RS6 Avant', version: 'RS6 Avant Performance',
    year: 2024, image: img.login, price: 1099990, rating: 4.9,
    fuel: 'Combustão', power: '600 cv', bodyType: 'Perua', transmission: 'Automático',
    category: 'popular', isFavorite: false, isElectric: false,
  },
  {
    id: '4', brand: 'Porsche', model: '911 Carrera', version: '911 Carrera S',
    year: 2024, image: img.home, price: 899000, rating: 5.0,
    fuel: 'Combustão', power: '385 cv', bodyType: 'Coupé', transmission: 'PDK',
    category: 'popular', isFavorite: true, isElectric: false, isFeatured: true,
  },
  {
    id: '5', brand: 'Lamborghini', model: 'Huracán', version: 'Huracán EVO',
    year: 2024, image: img.register, price: 3500000, rating: 5.0,
    fuel: 'Combustão', power: '640 cv', bodyType: 'Coupé', transmission: 'Automático',
    category: 'popular', isFavorite: false, isElectric: false, isFeatured: true,
  },
];

export const favoriteVehicles: VehicleMock[] = [
  {
    id: '6', brand: 'Toyota', model: 'Corolla', version: 'XEi 2.0 Flex',
    year: 2024, image: img.login, price: 149990, rating: 4.7,
    fuel: 'Combustão', power: '177 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
  },
  {
    id: '7', brand: 'Honda', model: 'HR-V', version: 'Touring Hybrid',
    year: 2024, image: img.home, price: 179990, rating: 4.6,
    fuel: 'Híbrido', power: '131 cv', bodyType: 'SUV', transmission: 'CVT',
    category: 'favorite', isFavorite: true, isElectric: false,
  },
  {
    id: '8', brand: 'Volkswagen', model: 'Polo', version: 'GTS 1.4 TSI',
    year: 2024, image: img.register, price: 109990, rating: 4.5,
    fuel: 'Combustão', power: '128 cv', bodyType: 'Hatch', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
  },
  {
    id: '9', brand: 'Hyundai', model: 'HB20S', version: 'Diamond 1.0 T',
    year: 2024, image: img.login, price: 89990, rating: 4.4,
    fuel: 'Combustão', power: '120 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'favorite', isFavorite: true, isElectric: false,
  },
  {
    id: '10', brand: 'Fiat', model: 'Pulse', version: 'Impetus T200 CVT',
    year: 2024, image: img.home, price: 119990, rating: 4.3,
    fuel: 'Combustão', power: '130 cv', bodyType: 'SUV', transmission: 'CVT',
    category: 'favorite', isFavorite: true, isElectric: false,
  },
];

export const electricVehicles: VehicleMock[] = [
  {
    id: '11', brand: 'BYD', model: 'Dolphin', version: 'Plus 60 kWh',
    year: 2024, image: img.register, price: 149990, rating: 4.8,
    fuel: 'Elétrico', power: '204 cv', bodyType: 'Hatch', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
  },
  {
    id: '12', brand: 'Volvo', model: 'EX30', version: 'Single Motor',
    year: 2024, image: img.home, price: 249990, rating: 4.9,
    fuel: 'Elétrico', power: '272 cv', bodyType: 'SUV', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true, isFeatured: true,
  },
  {
    id: '13', brand: 'BYD', model: 'Seal', version: 'AWD 82 kWh',
    year: 2024, image: img.login, price: 219990, rating: 4.7,
    fuel: 'Elétrico', power: '313 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
  },
  {
    id: '14', brand: 'GWM', model: 'ORA 03', version: 'Premium 63 kWh',
    year: 2024, image: img.register, price: 179990, rating: 4.5,
    fuel: 'Elétrico', power: '204 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true,
  },
  {
    id: '15', brand: 'Tesla', model: 'Model 3', version: 'Long Range AWD',
    year: 2024, image: img.home, price: 299990, rating: 4.9,
    fuel: 'Elétrico', power: '286 cv', bodyType: 'Sedan', transmission: 'Automático',
    category: 'electric', isFavorite: false, isElectric: true, isFeatured: true,
  },
];
