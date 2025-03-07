export interface BreadcrumbItem {
  value: string;
  title: string;
  children?: BreadcrumbItem[];
}

export const buildBreadcrumbs = (
  items: BreadcrumbItem[],
  targetValue: string,
  path: { value: string; title: string }[] = []
): { value: string; title: string }[] | null => {
  for (const item of items) {
    const newPath = [...path, { value: item.value, title: item.title }];

    if (item.value === targetValue) {
      return newPath;
    }

    if (item.children) {
      const foundPath = buildBreadcrumbs(item.children, targetValue, newPath);

      if (foundPath) return foundPath;
    }
  }

  return null;
};
