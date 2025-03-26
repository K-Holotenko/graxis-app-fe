import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useCategoriesStore } from 'src/stores/categoriesStore';
import { buildCategoriesTree } from 'src/utils/buildCategoriesTree';

import { NotificationType, useNotification } from './useNotification';

export interface Category {
  title: string;
  value: string;
  children?: Category[];
  labelStyles?: string;
}

export const useCategories = (): {
  treeData: Category[];
  setTreeData: Dispatch<SetStateAction<Category[]>>;
} => {
  const [treeData, setTreeData] = useState<Category[]>([]);
  const { getAllCategories } = useCategoriesStore();
  const { openNotification } = useNotification();

  const showError = (description: string): void => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  useEffect(() => {
    getAllCategories(showError).then((cat) => {
      if (cat) {
        setTreeData(buildCategoriesTree(cat));
      }
    });
  }, []);

  return { treeData, setTreeData };
};
