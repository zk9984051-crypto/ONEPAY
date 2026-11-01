import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Apple iPhone 15 Pro (128GB, Natural Titanium)',
    titleUrdu: 'ایپل آئی فون 15 پرو - قدرتی ٹائٹینیم پی ٹی اے تصدیق شدہ',
    description: 'Official PTA Approved, 100% battery health, completely scratchless with box and original braided cable. Dual eSIM + Physical SIM. EasyPaisa and JazzCash verified instant transfer accepted.',
    price: 365000,
    category: 'mobiles',
    condition: 'Like New / Open Box (10/10)',
    city: 'Lahore',
    locationArea: 'Gulberg III, Main Boulevard',
    image: '/src/assets/images/product_iphone15_pro_1793473938310.jpg',
    seller: {
      id: 'seller-101',
      name: 'Usman Ghani Tech Hub',
      phone: '0300-4567891',
      whatsapp: '923004567891',
      verified: true,
      rating: 4.9,
      salesCount: 142,
      jazzCashNumber: '0300-4567891',
      easyPaisaNumber: '0345-4567891'
    },
    featured: true,
    createdAt: '2 hours ago',
    views: 420
  },
  {
    id: 'prod-2',
    title: 'Dell XPS 13 Plus (13.4" OLED 3.5K, Core i7, 16GB, 512GB SSD)',
    titleUrdu: 'ڈیل ایکس پی ایس 13 لیپ ٹاپ - او ایل ای ڈی سکرین',
    description: 'Touch Bar keyboard with zero-lattice design, 4K OLED touch display, Intel 13th Gen Evo Core i7. Original 65W Type-C Dell charger included. Perfect for programming and editing.',
    price: 245000,
    category: 'laptops',
    condition: 'Like New / Open Box (10/10)',
    city: 'Islamabad',
    locationArea: 'Blue Area, Jinnah Avenue',
    image: '/src/assets/images/product_dell_xps_laptop_1793473999123.jpg',
    seller: {
      id: 'seller-102',
      name: 'Capital Tech Mart',
      phone: '0312-9876543',
      whatsapp: '923129876543',
      verified: true,
      rating: 4.8,
      salesCount: 89,
      jazzCashNumber: '0312-9876543',
      easyPaisaNumber: '0312-9876543'
    },
    featured: true,
    createdAt: '4 hours ago',
    views: 310
  },
  {
    id: 'prod-3',
    title: 'Honda CG 125 Special Edition (Model 2024, Red)',
    titleUrdu: 'ہونڈا سی جی 125 ماڈل 2024 - سرخ اسپیشل ایڈیشن',
    description: 'First owner bike, totally genuine condition, only 4,800 KM driven on high-octane. Smart card in hand, bio-metric available on spot. 5-speed smooth transmission.',
    price: 278000,
    category: 'vehicles',
    condition: 'Used - Excellent (9/10)',
    city: 'Karachi',
    locationArea: 'Clifton Block 5, Marine Drive',
    image: '/src/assets/images/product_honda_cg125_1793474000159.jpg',
    seller: {
      id: 'seller-103',
      name: 'Malik Auto Deals',
      phone: '0333-2109876',
      whatsapp: '923332109876',
      verified: true,
      rating: 4.9,
      salesCount: 65,
      jazzCashNumber: '0333-2109876',
      easyPaisaNumber: '0333-2109876'
    },
    featured: true,
    createdAt: '1 day ago',
    views: 650
  },
  {
    id: 'prod-4',
    title: 'Handcrafted Royal Emerald Silk Festive Kurta',
    titleUrdu: 'شاہی زمردی سِلک کڑھائی والا کُرتا - دستکاری',
    description: 'Pure raw banarsi silk with delicate golden tilla hand-embroidery on collar and cuffs. Ideal for Mehndi, Barat, Eid festivals. Available in sizes Medium and Large.',
    price: 14500,
    category: 'fashion',
    condition: 'Brand New (سیل پیک)',
    city: 'Lahore',
    locationArea: 'Anarkali Bazaar & DHA Phase 5',
    image: '/src/assets/images/product_designer_kurta_1793473939120.jpg',
    seller: {
      id: 'seller-104',
      name: 'Noor-e-Haram Couture',
      phone: '0321-8765432',
      whatsapp: '923218765432',
      verified: true,
      rating: 5.0,
      salesCount: 210,
      jazzCashNumber: '0321-8765432',
      easyPaisaNumber: '0321-8765432'
    },
    featured: false,
    createdAt: '1 day ago',
    views: 180
  },
  {
    id: 'prod-5',
    title: 'Apple AirPods Pro (2nd Generation, Type-C)',
    titleUrdu: 'ایپل ایئر پوڈز پرو سیکنڈ جنریشن - فعال شور منسوخی',
    description: 'Active Noise Cancellation, Adaptive Audio, Transparency mode, MagSafe case with lanyard loop. 100% original serial number active on Apple coverage.',
    price: 68500,
    category: 'electronics',
    condition: 'Brand New (سیل پیک)',
    city: 'Rawalpindi',
    locationArea: 'Saddar Commercial Market',
    image: '/src/assets/images/hero_marketplace_pakistan_1793473938173.jpg',
    seller: {
      id: 'seller-105',
      name: 'Pindi Sound & Gadgets',
      phone: '0302-3344556',
      whatsapp: '923023344556',
      verified: true,
      rating: 4.7,
      salesCount: 94,
      jazzCashNumber: '0302-3344556',
      easyPaisaNumber: '0302-3344556'
    },
    featured: false,
    createdAt: '3 days ago',
    views: 290
  }
];

export const PAKISTANI_CITIES = [
  'All Cities (تمام شہر)',
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Peshawar',
  'Multan',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad'
];
