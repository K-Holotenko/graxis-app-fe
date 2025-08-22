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

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: null,
  isLoading: false,
  getAllCategories: async (showError: (err: string) => void) => {
    set({ isLoading: true });

    try {
      const response = await getAllCategories();

      set({ categories: response });

      return response;
    } catch {
      showError('Категорії наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isLoading: false });
    }
  },
}));
