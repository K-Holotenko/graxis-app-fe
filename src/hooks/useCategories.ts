import { useEffect } from 'react';

import { useCategoriesStore } from 'src/stores/categoriesStore';
import { buildCategoriesTree } from 'src/utils/buildCategoriesTree';

import { NotificationType, useNotification } from './useNotification';

export interface Category {
  title: string;
  value: string;
  children?: Category[];
}

export const useCategories = (): { categoriesTree: Category[] } => {
  const { categories, getAllCategories } = useCategoriesStore();
  const { openNotification } = useNotification();

  const showError = (description: string): void => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  useEffect(() => {
    if (!categories?.length) {
      getAllCategories(showError);
    }
  }, []);

  const categoriesTree = buildCategoriesTree(categories ?? []);

  return { categoriesTree };
};
