import { create } from 'zustand';

import { getAllCategories } from 'src/services/CategoriesService';

export interface Category {
  id: string;
  createdAt: string;
  name: string;
  ukr: string;
  parentId: string | null;
  updatedAt: string;
}

interface CategoriesStore {
  categories: Category[] | null;
  isLoading: boolean;
  getAllCategories: (
    showError: (err: string) => void
  ) => Promise<Category[] | undefined | null>;
}

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: null,
  isLoading: false,
  getAllCategories: async (showError: (err: string) => void) => {
    if (get().categories) {
      return get().categories;
    }

    set({ isLoading: true });

    try {
      const response = await getAllCategories();

      set({ categories: response, isLoading: false });

      return response;
    } catch {
      set({ isLoading: false });
      showError('Категорії наразі недоступні. Спробуйте ще раз');
    }
  },
}));
