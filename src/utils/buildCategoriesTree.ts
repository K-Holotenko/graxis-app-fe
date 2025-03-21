interface CategoryData {
  id: string;
  name: string;
  parentId: string | null;
}

interface CategoryTreeItem {
  title: string;
  value: string;
  children: CategoryTreeItem[];
  selectable: boolean;
  parentId: string | null;
}

export const buildCategoriesTree = (
  initialCategories: CategoryData[]
): CategoryTreeItem[] => {
  const allCategories = new Map<string, CategoryTreeItem>();

  initialCategories.forEach(({ id, name, parentId }) => {
    allCategories.set(id, {
      title: name,
      value: id,
      children: [],
      selectable: false,
      parentId,
    });
  });

  initialCategories.forEach(({ id, parentId }) => {
    const item = allCategories.get(id)!;

    if (parentId && allCategories.has(parentId)) {
      const parentItem = allCategories.get(parentId)!;

      parentItem.children.push(item);
    }
  });

  allCategories.forEach((item) => {
    item.selectable = item.children.length === 0;
  });

  const topLevelCategory = Array.from(allCategories.values()).filter(
    (item) => !initialCategories.some((c) => c.id === item.value && c.parentId)
  );

  return topLevelCategory;
};
