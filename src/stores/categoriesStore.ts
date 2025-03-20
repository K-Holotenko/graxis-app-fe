import { create } from 'zustand';

import { getAllCategories } from 'src/services/CategoriesService';

export interface Categories {
  id: string;
  createdAt: string;
  name: string;
  parentId: string;
  updatedAt: string;
}

interface CategoriesStore {
  categories: Categories[];
  isLoading: boolean;
  getAllCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  isLoading: false,
  getAllCategories: async () => {
    set({ isLoading: true });
    const response = await getAllCategories();

    if (!response.ok) {
      set({ isLoading: false });
      throw new Error('Failed to fetch categories');
    }

    const categoriesData: Categories[] = await response.json();

    set({ categories: categoriesData, isLoading: false });
  },
}));
