export interface BreadcrumbItem {
  value: string;
  title: string;
  children?: BreadcrumbItem[];
}

export const buildBreadcrumbsPath = (
  nodes: BreadcrumbItem[],
  pathValues: string[]
): BreadcrumbItem[] => {
  const result: BreadcrumbItem[] = [];
  let currentLevel = nodes;

  for (const value of pathValues) {
    const next = currentLevel.find((item) => item.value === value);

    if (!next) break;
    result.push(next);
    currentLevel = next.children ?? [];
  }

  return result;
};
