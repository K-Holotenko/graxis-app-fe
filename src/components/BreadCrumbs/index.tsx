import { Breadcrumb, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

import { TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';
import { Category, findBreadcrumbPath } from './utils/findBreadcrumbPath';

interface BreadcrumbsProps {
  currentCategory: string;
  data: Category[];
  showAllCategory?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentCategory,
  data,
  showAllCategory = false,
  className,
}) => {
  const path = findBreadcrumbPath(data, currentCategory);

  if (!path) return null;

  const fullPath = showAllCategory
    ? [{ value: 'all', title: TEXT.ALL_CATEGORIES }, ...path]
    : path;

  const breadcrumbItems = fullPath.map((item) => ({
    key: item.value,
    title: (
      <Link
        to={item.value === 'all' ? '/category' : `/category/${item.value}`}
        className={styles.link}
      >
        {item.title}
      </Link>
    ),
  }));

  return (
    <ConfigProvider theme={localTheme}>
      <Breadcrumb
        className={`${styles.wrapper} ${className}`}
        items={breadcrumbItems}
      />
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    Breadcrumb: {
      linkColor: theme.N4,
      separatorColor: theme.N4,
      linkHoverColor: theme.N6,
      colorBgTextHover: theme.N2,
    },
  },
};
