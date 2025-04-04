import { type Category } from 'src/hooks/useCategories';

export const findCategoryByValue = (
  nodes: Category[],
  val: string
): Category | undefined => {
  for (const node of nodes) {
    if (node.value === val) return node;
    if (node.children) {
      const found = findCategoryByValue(node.children, val);

      if (found) return found;
    }
  }
};

export const getAllDescendantsValues = (node: Category): string[] => {
  if (!node.children?.length) return [];
  let results: string[] = [];

  for (const child of node.children) {
    results.push(child.value);
    results = results.concat(getAllDescendantsValues(child));
  }

  return results;
};

export const findPathByValue = (
  nodes: Category[],
  val: string,
  path: string[] = []
): string[] => {
  for (const node of nodes) {
    const newPath = [...path, node.value];

    if (node.value === val) return newPath;
    if (node.children) {
      const result = findPathByValue(node.children, val, newPath);

      if (result.length) return result;
    }
  }

  return [];
};

export const handleCategoriesChange = (
  value: string[][],
  categoriesTree: Category[],
  searchParams: URLSearchParams
): URLSearchParams => {
  const flattenedAll: string[] = [];

  value.forEach((path) => {
    const leafVal = path[path.length - 1];
    const category = findCategoryByValue(categoriesTree, leafVal);

    if (category?.children?.length) {
      flattenedAll.push(...getAllDescendantsValues(category));
    } else {
      flattenedAll.push(leafVal);
    }
  });

  const search = new URLSearchParams(searchParams);

  if (!flattenedAll.length) {
    search.delete('categories');
  } else {
    search.set('categories', flattenedAll.join(','));
  }

  return search;
};

export const getCurrentCityOption = (
  cityValue: string | undefined,
  cityList: Array<{ value: string; label: string }>
): string | undefined => {
  if (cityValue) {
    const foundCity = cityList.find((city) => city.value === cityValue);

    return foundCity?.value || cityList[0].value;
  }

  return undefined;
};
