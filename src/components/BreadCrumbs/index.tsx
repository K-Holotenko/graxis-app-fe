import { Breadcrumb, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

import { theme } from 'src/config/theme';
import { GeneratedBreadcrumbItem } from 'src/components/BreadCrumbs/utils/generateBreadcrumbs';

import styles from './styles.module.scss';

interface BreadcrumbsProps {
  breadcrumbItems: GeneratedBreadcrumbItem[] | null;
  className?: string;
  isMobile?: boolean;
}

export const BreadCrumbs = ({
  breadcrumbItems,
  className,
  isMobile = false,
}: BreadcrumbsProps) => {
  if (!breadcrumbItems) return null;

  const itemsToDisplay = isMobile
    ? [breadcrumbItems[0], breadcrumbItems[breadcrumbItems.length - 1]]
    : breadcrumbItems;

  return (
    <ConfigProvider theme={localTheme}>
      <Breadcrumb
        className={`${styles.wrapper} ${className}`}
        items={itemsToDisplay.map(({ url, title, isLast, key }) => ({
          title: (
            <Link to={url} className={isLast ? styles.lastLink : ''}>
              {title}
            </Link>
          ),
          key,
        }))}
      />
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    Breadcrumb: {
      linkColor: theme.N4,
      separatorColor: theme.N4,
      linkHoverColor: theme.N5,
      colorBgTextHover: theme.N2,
    },
  },
};
