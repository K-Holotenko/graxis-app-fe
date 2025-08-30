export interface Category {
  id: string;
  createdAt: string;
  name: string;
  ukr: string;
  parentId: string | null;
  updatedAt: string;
}

export interface CategoryTree {
  title: string;
  value: string;
  children?: CategoryTree[];
}
