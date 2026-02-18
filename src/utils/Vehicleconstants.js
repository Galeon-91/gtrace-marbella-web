// ============================================
// MARCAS DE COCHES (Premium & Lujo)
// ============================================

export const CAR_BRANDS = [
  // Lujo Ultra Premium
  'Aston Martin',
  'Bentley',
  'Bugatti',
  'Ferrari',
  'Koenigsegg',
  'Lamborghini',
  'Maserati',
  'McLaren',
  'Pagani',
  'Porsche',
  'Rolls-Royce',
  
  // Premium
  'Audi',
  'BMW',
  'Mercedes-Benz',
  'Lexus',
  'Tesla',
  'Jaguar',
  'Land Rover',
  'Alfa Romeo',
  'Cadillac',
  'Genesis',
  'Infiniti',
  'Acura',
  'Lincoln',
  
  // Marcas Generales
  'Abarth',
  'Alpine',
  'Chevrolet',
  'Chrysler',
  'Citroën',
  'Cupra',
  'Dacia',
  'Dodge',
  'DS',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Jeep',
  'Kia',
  'Lancia',
  'Mazda',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Opel',
  'Peugeot',
  'Renault',
  'Seat',
  'Skoda',
  'Smart',
  'Subaru',
  'Suzuki',
  'Toyota',
  'Volkswagen',
  'Volvo'
].sort();

export const FUEL_TYPES = {
  gasolina: { es: 'Gasolina', en: 'Gasoline', icon: '⛽' },
  diesel: { es: 'Diésel', en: 'Diesel', icon: '🛢️' },
  electrico: { es: 'Eléctrico', en: 'Electric', icon: '⚡' },
  hibrido: { es: 'Híbrido', en: 'Hybrid', icon: '🔋' },
  hibrido_enchufable: { es: 'Híbrido Enchufable', en: 'Plug-in Hybrid', icon: '🔌' }
};

export const BODY_TYPES = {
  deportivo: { es: 'Deportivo', en: 'Sports Car', icon: '🏎️' },
  suv: { es: 'SUV', en: 'SUV', icon: '🚙' },
  sedan: { es: 'Sedán', en: 'Sedan', icon: '🚗' },
  coupe: { es: 'Coupé', en: 'Coupe', icon: '🚘' },
  cabrio: { es: 'Cabrio', en: 'Convertible', icon: '🌞' },
  monovolumen: { es: 'Monovolumen', en: 'MPV', icon: '🚐' },
  familiar: { es: 'Familiar', en: 'Estate', icon: '🚙' },
  pickup: { es: 'Pick-up', en: 'Pickup', icon: '🛻' }
};

export const TRANSMISSIONS = {
  manual: { es: 'Manual', en: 'Manual' },
  automatico: { es: 'Automático', en: 'Automatic' }
};

export const ECO_LABELS = {
  CERO: { es: 'CERO Emisiones', en: 'Zero Emissions', color: '#0066FF' },
  ECO: { es: 'ECO', en: 'ECO', color: '#00AA00' },
  C: { es: 'C', en: 'C', color: '#FFAA00' },
  B: { es: 'B', en: 'B', color: '#FF6600' }
};

export const VEHICLE_STATUS = {
  available: { es: 'Disponible', en: 'Available', color: '#00AA00' },
  reserved: { es: 'Reservado', en: 'Reserved', color: '#FFAA00' },
  sold: { es: 'Vendido', en: 'Sold', color: '#FF0000' }
};

export const CONDITIONS = {
  nuevo: { es: 'Nuevo', en: 'New' },
  ocasion: { es: 'Ocasión', en: 'Pre-owned' }
};