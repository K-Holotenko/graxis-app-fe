export interface BreadcrumbItem {
  value: string;
  title: string;
  children?: BreadcrumbItem[];
}

export const buildBreadcrumbsPath = (
  allBreadcrumbs: BreadcrumbItem[],
  breadcrumbPath: string[]
): BreadcrumbItem[] => {
  const matchedBreadcrumbs: BreadcrumbItem[] = [];
  let nestedBreadcrumbs = allBreadcrumbs;

  for (const value of breadcrumbPath) {
    const currentBreadcrumb = nestedBreadcrumbs.find(
      (item) => item.value === value
    );

    if (!currentBreadcrumb) break;

    matchedBreadcrumbs.push(currentBreadcrumb);
    nestedBreadcrumbs = currentBreadcrumb.children ?? [];
  }

  return matchedBreadcrumbs;
};
