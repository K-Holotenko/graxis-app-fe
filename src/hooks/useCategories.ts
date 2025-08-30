import { useEffect } from 'react';

import { useCategoriesStore } from 'src/stores/categoriesStore';
import { buildCategoriesTree } from 'src/utils/buildCategoriesTree';
import { CategoryTree } from 'src/types';

import { NotificationType, useNotification } from './useNotification';

export const useCategories = (): {
  categoriesTree: CategoryTree[];
} => {
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
