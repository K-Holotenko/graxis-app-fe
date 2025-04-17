import { TEXT } from 'src/config/constants';
import {
  findCategoryByValue,
  findPathByValue,
  getAllDescendantsValues,
} from 'src/pages/SearchPage/children/Filters/utils/filters';
import { ROUTES } from 'src/router/routes';

import { BreadcrumbItem, buildBreadcrumbsPath } from './buildBreadcrumbsPath';

interface GenerateBreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
  currentBreadcrumb: string;
  showAllItems?: boolean;
}

export interface GeneratedBreadcrumbItem {
  key: string;
  title: string;
  url: string;
  isLast: boolean;
}

export const generateBreadcrumbs = ({
  breadcrumbs,
  currentBreadcrumb,
  showAllItems = false,
}: GenerateBreadcrumbsProps): GeneratedBreadcrumbItem[] | null => {
  const path = findPathByValue(breadcrumbs, currentBreadcrumb);

  if (!path.length) return null;

  const pathItems = buildBreadcrumbsPath(breadcrumbs, path);

  const fullPath = showAllItems
    ? [{ value: 'all', title: TEXT.ALL_CATEGORIES, children: [] }, ...pathItems]
    : pathItems;

  return fullPath.map(({ value, title }, index) => {
    const isLast = index === fullPath.length - 1;
    const base = ROUTES.SEARCH_RESULTS;

    const categories =
      value === 'all'
        ? []
        : isLast
          ? [value]
          : getAllDescendantsValues(findCategoryByValue(breadcrumbs, value)!);

    const url =
      categories.length > 0
        ? `${base}?categories=${categories.join('%2C')}`
        : base;

    return {
      key: value,
      title,
      url,
      isLast,
    };
  });
};
