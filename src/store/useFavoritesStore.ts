
import { create } from "zustand";

type State = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<State>((set) => ({
  favorites: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fid) => fid !== id)
        : [...state.favorites, id],
    })),
}));
