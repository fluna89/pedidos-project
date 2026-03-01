// Mock data - simulates backend responses
// Replace with real API calls when backend is ready

// ── Catálogo ───────────────────────────────────────────

export const mockCategories = [
  { id: 'hamburguesas', name: 'Hamburguesas', icon: '🍔' },
  { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
  { id: 'acompañamientos', name: 'Acompañamientos', icon: '🍟' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
]

export const mockMenu = [
  {
    id: 1,
    name: 'Hamburguesa Clásica',
    description: 'Carne, lechuga, tomate, queso cheddar',
    category: 'hamburguesas',
    image: null,
    available: true,
    formats: [
      { id: 'f1-simple', name: 'Simple', price: 2500 },
      { id: 'f1-doble', name: 'Doble carne', price: 3500 },
    ],
    extras: [
      { id: 'x-bacon', name: 'Bacon', price: 400 },
      { id: 'x-egg', name: 'Huevo', price: 300 },
      { id: 'x-cheddar', name: 'Extra cheddar', price: 250 },
    ],
  },
  {
    id: 2,
    name: 'Hamburguesa Veggie',
    description: 'Medallón de lentejas, rúcula, tomate seco',
    category: 'hamburguesas',
    image: null,
    available: true,
    formats: [
      { id: 'f2-simple', name: 'Simple', price: 2600 },
      { id: 'f2-doble', name: 'Doble medallón', price: 3600 },
    ],
    extras: [
      { id: 'x-guac', name: 'Guacamole', price: 400 },
      { id: 'x-cheddar', name: 'Extra cheddar', price: 250 },
    ],
  },
  {
    id: 3,
    name: 'Pizza Muzzarella',
    description: 'Salsa de tomate, muzzarella, orégano',
    category: 'pizzas',
    image: null,
    available: true,
    formats: [
      { id: 'f3-chica', name: 'Chica (4 porc.)', price: 2500 },
      { id: 'f3-grande', name: 'Grande (8 porc.)', price: 4200 },
    ],
    extras: [],
  },
  {
    id: 4,
    name: 'Pizza Napolitana',
    description: 'Salsa de tomate, muzzarella, tomate, ajo',
    category: 'pizzas',
    image: null,
    available: false,
    formats: [
      { id: 'f4-chica', name: 'Chica (4 porc.)', price: 2700 },
      { id: 'f4-grande', name: 'Grande (8 porc.)', price: 4500 },
    ],
    extras: [],
  },
  {
    id: 5,
    name: 'Papas Fritas',
    description: 'Porción grande con salsa a elección',
    category: 'acompañamientos',
    image: null,
    available: true,
    formats: [{ id: 'f5-porcion', name: 'Porción', price: 1500 }],
    extras: [
      { id: 'x-cheddar-pp', name: 'Cheddar', price: 350 },
      { id: 'x-bacon-pp', name: 'Bacon', price: 400 },
    ],
  },
  {
    id: 6,
    name: 'Gaseosa 500ml',
    description: 'Coca-Cola, Sprite o Fanta',
    category: 'bebidas',
    image: null,
    available: true,
    formats: [{ id: 'f6-500', name: '500ml', price: 800 }],
    extras: [],
  },
  {
    id: 7,
    name: 'Agua mineral',
    description: 'Con o sin gas',
    category: 'bebidas',
    image: null,
    available: true,
    formats: [{ id: 'f7-500', name: '500ml', price: 600 }],
    extras: [],
  },
]

export const mockOrderStatuses = [
  'pendiente',
  'confirmado',
  'en_preparacion',
  'listo',
  'en_camino',
  'entregado',
]

// Coverage zone — addresses within 5 km of the store are covered
export const mockStoreLocation = { lat: -34.6037, lng: -58.3816 } // CABA centro
export const mockMaxDeliveryKm = 5

export const mockAddresses = [
  {
    id: 'addr-1',
    alias: 'Casa',
    street: 'Av. Corrientes 1234',
    floor: '3',
    apartment: 'B',
    neighborhood: 'San Nicolás',
    city: 'CABA',
    comment: 'Timbre B',
    lat: -34.6045,
    lng: -58.3923,
    inCoverage: true,
  },
  {
    id: 'addr-2',
    alias: 'Trabajo',
    street: 'Maipú 456',
    floor: '12',
    apartment: 'A',
    neighborhood: 'Retiro',
    city: 'CABA',
    comment: '',
    lat: -34.5997,
    lng: -58.3751,
    inCoverage: true,
  },
  {
    id: 'addr-3',
    alias: 'Casa de mamá',
    street: 'Av. San Martín 8900',
    floor: '',
    apartment: '',
    neighborhood: 'Centro',
    city: 'Pilar',
    comment: 'Portón verde',
    lat: -34.4588,
    lng: -58.9142,
    inCoverage: false,
  },
]
