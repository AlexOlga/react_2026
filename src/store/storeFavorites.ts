import { create } from 'zustand';

interface IFavoritesStore {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  totalFavorite: () => number;
  removeAllFavorite: () => void;
}

export const useFavorites = create<IFavoritesStore>((set, get) => ({
  favorites: [],
  toggleFavorite: (id: number) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((i: number) => i !== id)
        : [...state.favorites, id],
    })),
  isFavorite: (id: number) => get().favorites.includes(id),
  totalFavorite: () => get().favorites.length,
  removeAllFavorite: () => set({ favorites: [] }),
}));
