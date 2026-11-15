import { randomBytes } from 'crypto';

// Types
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  sizes: string[];
  tag: string;
};

export type WebsiteSettings = {
  brandName: string;
  tagline: string;
  announcement: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroStamp: string;
  campaignTitle: string;
  campaignSubtitle: string;
  manifestoTitle: string;
  manifestoText: string;
  manifestoTagline: string;
  newsletterPlaceholder: string;
  footerNote: string;
  currency: string;
  locale: string;
  email: string;
};

export type AdminSession = {
  userId: string;
  username: string;
  name: string;
  avatar: string;
  role: 'admin';
  expiresAt: number;
};

// Constants
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_USERNAME = 'admin';
const SESSION_KEY = 'drmhus_admin_session';
const PRODUCTS_KEY = 'drmhus_products';
const SETTINGS_KEY = 'drmhus_settings';

// Default data
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'limited-tee',
    name: 'Limited Edition Logo Tee',
    price: 33000,
    image: '/products/limited-edition-logo-tee.jpg',
    description: 'A white tee with a minimal front mark and ticket-inspired back graphic.',
    stock: 5,
    sizes: ['S', 'M', 'L', 'XL'],
    tag: 'LIMITED EDITION',
  },
  {
    id: 'ringer-tee',
    name: 'Ringer Graphic Tee',
    price: 35000,
    image: '/products/ringer-graphic-tee.jpg',
    description: 'A contrast-trim tee with a planetary chest graphic and bold back print.',
    stock: 8,
    sizes: ['S', 'M', 'L', 'XL'],
    tag: 'NEW ARRIVAL',
  },
];

export const DEFAULT_SETTINGS: WebsiteSettings = {
  brandName: 'DRMHUS ORGNLS.',
  tagline: 'Built Different',
  announcement: 'INDEPENDENT STREETWEAR · LAGOS, NIGERIA',
  heroTitle: 'BUILT DIFFERENT.',
  heroSubtitle: 'A new standard for everyday wear. Made to move with your own direction.',
  heroImage: '/campaign/hero-couple.jpg',
  heroStamp: 'ORIGINAL\nBY DESIGN',
  campaignTitle: 'MADE FOR THE EVERYDAY.',
  campaignSubtitle: 'Wear the future. Live forever.',
  manifestoTitle: 'NOT MADE TO FIT IN. MADE TO BE YOURS.',
  manifestoText: 'DRMHUS ORGNLS. is about personal expression through everyday uniform. The details speak. You decide what they say.',
  manifestoTagline: 'INDEPENDENT BY NATURE.',
  newsletterPlaceholder: 'YOUR EMAIL ADDRESS',
  footerNote: 'INDEPENDENT STREETWEAR · NIGERIA',
  email: 'hello@drmhus.example',
  currency: 'NGN',
  locale: 'en-NG',
};

// Helper functions
function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredData<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Admin session management
export function getAdminSession(): AdminSession | null {
  const session = getStoredData<AdminSession | null>(SESSION_KEY, null);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return session;
}

export function createAdminSession(user: {
  username: string;
  name: string;
  avatar: string;
}): AdminSession {
  const session: AdminSession = {
    userId: randomBytes(16).toString('hex'),
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    role: 'admin',
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logoutAdmin(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthenticated(): boolean {
  return getAdminSession() !== null;
}

// Product management
export function getProducts(): Product[] {
  return getStoredData<Product[]>(PRODUCTS_KEY, DEFAULT_PRODUCTS);
}

export function setProducts(products: Product[]): void {
  setStoredData(PRODUCTS_KEY, products);
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: randomBytes(8).toString('hex'),
  };
  setProducts([...products, newProduct]);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  setProducts(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  setProducts(filtered);
  return true;
}

// Website settings management
export function getSettings(): WebsiteSettings {
  return getStoredData<WebsiteSettings>(SETTINGS_KEY, DEFAULT_SETTINGS);
}

export function setSettings(settings: Partial<WebsiteSettings>): void {
  const current = getSettings();
  setStoredData(SETTINGS_KEY, { ...current, ...settings });
}

// Login validation
export function validateAdminLogin(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Generate default image if not exists
export function getDefaultImage(filename: string): string {
  return `/images/${filename}`;
}