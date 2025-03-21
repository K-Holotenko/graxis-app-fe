import { create } from 'zustand';

import { getAllCategories } from 'src/services/CategoriesService';

export interface Categories {
  id: string;
  createdAt: string;
  name: string;
  parentId: string | null;
  updatedAt: string;
}

interface CategoriesStore {
  categories: Categories[];
  isLoading: boolean;
  isLoaded: boolean;
  getAllCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: [],
  isLoading: false,
  isLoaded: false,
  getAllCategories: async () => {
    if (get().isLoaded) return;

    set({ isLoading: true });
    const response = await getAllCategories();

    if (!response.ok) {
      set({ isLoading: false });
      throw new Error('Failed to fetch categories');
    }

    const categoriesData: Categories[] = await response.json();

    set({ categories: categoriesData, isLoading: false, isLoaded: true });
  },
}));
