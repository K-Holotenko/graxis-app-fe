import { useEffect, useState } from 'react';
import { Cascader, ConfigProvider } from 'antd';
import { useSearchParams } from 'react-router-dom';

import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import ArrowRight from 'src/assets/icons/arrow-right-icon.svg?react';
import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useCategories } from 'src/hooks/useCategories';
import {
  buildParams,
  findCategoryPath,
} from 'src/pages/SearchResultsPage/utils/config';

import styles from './styles.module.scss';

export const CategoriesFilter = () => {
  const [selectedValues, setSelectedValues] = useState<string[][]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowSize();
  const { categoriesTree } = useCategories();
  const isTablet = width <= SCREEN_WIDTH.MD;

  const onChange = (value: string[][]) => {
    setSelectedValues(value);
    setIsCategorySelected(value.length > 0);
    const currentTitle = searchParams.get('title') || '';
    const frontendCategories = value.map((path) => path[path.length - 1]);

    const { backendParams, frontendParams } = buildParams(
      frontendCategories,
      currentTitle,
      categoriesTree
    );

    setSearchParams(backendParams);
    window.history.replaceState({}, '', `?${frontendParams.toString()}`);
  };

  useEffect(() => {
    const frontendCategories = searchParams.getAll('categories');

    if (frontendCategories.length > 0) {
      const restoredValues = frontendCategories
        .map((category) => findCategoryPath(category, categoriesTree))
        .filter(Boolean) as string[][];

      const frontendParams = new URLSearchParams();

      frontendCategories.forEach((cat) =>
        frontendParams.append('categories', cat)
      );
      if (searchParams.get('title')) {
        frontendParams.set('title', searchParams.get('title')!);
      }

      const { backendParams } = buildParams(
        frontendCategories,
        searchParams.get('title') || '',
        categoriesTree
      );

      setSelectedValues(restoredValues);

      setSearchParams(backendParams, { replace: true });
      window.history.replaceState({}, '', `?${frontendParams.toString()}`);
    }
  }, []);

  const localTheme = setLocalTheme(isFocused, isCategorySelected);

  return (
    <ConfigProvider theme={localTheme}>
      <Cascader
        placeholder="Оберіть категорію"
        className={styles.cascader}
        allowClear={false}
        expandIcon={<ArrowRight className={styles.expandIcon} />}
        suffixIcon={<ArrowDown />}
        popupClassName={styles.popup}
        options={categoriesTree}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        value={selectedValues}
        fieldNames={{ label: 'title', value: 'value', children: 'children' }}
        onFocus={() => setIsFocused(false)}
        onBlur={() => setIsFocused(true)}
        dropdownMatchSelectWidth={isTablet}
      />
    </ConfigProvider>
  );
};

const setLocalTheme = (isFocused?: boolean, isCategorySelected?: boolean) => ({
  token: {
    colorBorder: theme.N3,
    colorText: theme.N6,
    boxShadowSecondary: '0 8px 28px 0 rgba(70, 68, 88, 0.08)',
  },
  components: {
    Cascader: {
      fontSize: 16,
      optionPadding: '8px 10px',
      lineHeight: 1.5,
      optionSelectedFontWeight: 400,
      optionSelectedBg: theme.secondary,
      controlItemBgHover: theme.N2,
      colorPrimary: theme.primary,
      colorPrimaryHover: theme.primary,
    },
    Select: {
      borderRadiusSM: 8,
      borderRadius: 8,
      activeOutlineColor: 'transparent',
      multipleItemBg: theme.N3,
      multipleItemHeight: 31,
      activeBorderColor: theme.N5,
      hoverBorderColor: theme.N4,
      paddingXXS: 8,
      colorBorder: !isFocused || !isCategorySelected ? theme.N3 : theme.success,
    },
  },
});
