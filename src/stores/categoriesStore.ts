import { create } from 'zustand';

import { getAllCategories } from 'src/services/CategoriesService';
import { Category } from 'src/types';

interface CategoriesState {
  categories: Category[] | null;
  isLoading: boolean;
}

interface CategoriesActions {
  getAllCategories: (
    showError: (err: string) => void
  ) => Promise<Category[] | undefined | null>;
}

export const useCategoriesStore = create<CategoriesState & CategoriesActions>(
  (set) => ({
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
  })
);
