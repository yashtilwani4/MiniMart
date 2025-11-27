export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  unit: string;
  discount?: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  color: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
