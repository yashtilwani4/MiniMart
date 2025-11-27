import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartStore, Product, CartItem} from '../types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? {...item, quantity: item.quantity + 1}
                : item
            ),
          });
        } else {
          set({
            items: [...items, {...product, quantity: 1}],
          });
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter(item => item.id !== productId),
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.id === productId ? {...item, quantity} : item
          ),
        });
      },

      clearCart: () => {
        set({items: []});
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'minimart-cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
