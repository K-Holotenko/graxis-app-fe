import { create } from 'zustand';

import { getAllCategories } from 'src/services/CategoriesService';

interface Category {
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
    if (get().isLoading) return;
    if (get().categories) {
      return get().categories;
    }

    set({ isLoading: true });

    try {
      const response = await getAllCategories();

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const categoriesData: Category[] = await response.json();

      set({ categories: categoriesData });

      return categoriesData;
    } catch {
      showError('Категорії наразі недоступні. Спробуйте ще раз');
    }
  },
}));
