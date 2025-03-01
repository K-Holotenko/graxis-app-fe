export interface Category {
  value: string;
  title: string;
  selectable?: boolean;
  children?: Category[];
}

export const findBreadcrumbPath = (
  categories: Category[],
  targetValue: string,
  path: { value: string; title: string }[] = []
): { value: string; title: string }[] | null => {
  for (const category of categories) {
    const newPath = [...path, { value: category.value, title: category.title }];

    if (category.value === targetValue) {
      return newPath;
    }

    if (category.children) {
      const foundPath = findBreadcrumbPath(
        category.children,
        targetValue,
        newPath
      );

      if (foundPath) return foundPath;
    }
  }

  return null;
};
