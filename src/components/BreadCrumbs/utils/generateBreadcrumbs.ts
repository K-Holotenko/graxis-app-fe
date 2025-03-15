import { TEXT } from 'src/config/constants';

import { BreadcrumbItem, buildBreadcrumbs } from './buildBreadcrumbs';

interface GenerateBreadcrumbsProps {
  items: BreadcrumbItem[];
  currentItem: string;
  showAllItems?: boolean;
}

export interface GeneratedBreadcrumbItem {
  key: string;
  title: string;
  url: string;
  isLast: boolean;
}

export const generateBreadcrumbs = ({
  items,
  currentItem,
  showAllItems = false,
}: GenerateBreadcrumbsProps): GeneratedBreadcrumbItem[] | null => {
  const path = buildBreadcrumbs(items, currentItem);

  if (!path) return null;

  const fullPath = showAllItems
    ? [{ value: 'all', title: TEXT.ALL_CATEGORIES }, ...path]
    : path;

  return fullPath.map(({ value, title }, index) => ({
    key: value,
    title,
    url: '/',
    isLast: index === fullPath.length - 1,
  }));
};
