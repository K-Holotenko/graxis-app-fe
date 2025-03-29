export const SEARCH_RESULTS_CONFIG = {
  PAGE_TITLE: 'Search Results',
};

interface CategoryTreeItem {
  value: string;
  children?: CategoryTreeItem[];
}

const getDescendantCategories = (
  targetValue: string,
  categories: CategoryTreeItem[]
): string[] => {
  const findNode = (
    nodes: CategoryTreeItem[]
  ): CategoryTreeItem | undefined => {
    for (const node of nodes) {
      if (node.value === targetValue) return node;
      if (node.children) {
        const found = findNode(node.children);

        if (found) return found;
      }
    }
  };

  const collectValues = (nodes: CategoryTreeItem[] = []): string[] =>
    nodes.flatMap((n) => [n.value, ...collectValues(n.children || [])]);

  return collectValues(findNode(categories)?.children || []);
};

export const buildParams = (
  frontendCategories: string[],
  title: string,
  categoriesTree: CategoryTreeItem[]
): { backendParams: URLSearchParams; frontendParams: URLSearchParams } => {
  const seenCategories = new Set<string>();

  frontendCategories.forEach((cat) => {
    seenCategories.add(cat);
    getDescendantCategories(cat, categoriesTree).forEach((desc) =>
      seenCategories.add(desc)
    );
  });

  const backendParams = new URLSearchParams();
  const frontendParams = new URLSearchParams();

  Array.from(seenCategories).forEach((cat) =>
    backendParams.append('categories', cat)
  );
  if (title) backendParams.set('title', title);

  frontendCategories.forEach((cat) => frontendParams.append('categories', cat));
  if (title) frontendParams.set('title', title);

  return { backendParams, frontendParams };
};

export const findCategoryPath = (
  targetValue: string,
  tree: CategoryTreeItem[]
): string[] | null => {
  for (const { value, children } of tree) {
    if (value === targetValue) return [value];
    if (children) {
      const path = findCategoryPath(targetValue, children);

      if (path) return [value, ...path];
    }
  }

  return null;
};
