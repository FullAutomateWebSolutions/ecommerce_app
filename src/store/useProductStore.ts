
import { Product } from "@/types/product";
import { create } from "zustand";


type State = {
  selectedProduct: Product | null;
  setSelectedProduct: (produto: Product | null) => void;
};

export const useProductStore = create<State>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (produto) => set({ selectedProduct: produto }),
}));
