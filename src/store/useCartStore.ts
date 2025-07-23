// src/store/useCartStore.ts
import { create } from 'zustand';
import { Product } from '@/types/product';

type CartItem = Product & { quantity: number };

type CartStore = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((p) => p.id === product.id);
      if (existing) {
        return {
          items: state.items.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((p) => p.id !== id),
    })),

  increaseQty: (id) =>
    set((state) => ({
      items: state.items.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      items: state.items
        .map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),
}));
