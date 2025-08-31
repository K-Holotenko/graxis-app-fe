import { useState } from 'react';
import { Cascader, ConfigProvider } from 'antd';
import { useSearchParams } from 'react-router-dom';

import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import ArrowRight from 'src/assets/icons/arrow-right-icon.svg?react';
import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ButtonTypes, SCREEN_WIDTH } from 'src/config/constants';
import { useCategories } from 'src/hooks/useCategories';
import {
  findPathByValue,
  handleCategoriesChange,
} from 'src/pages/SearchPage/children/Filters/utils/filters';
import { Button } from 'src/components/Button';

import styles from './styles.module.scss';

export const CategoriesFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFocused, setIsFocused] = useState(false);
  const anyFiltersSelected = ['title', 'city', 'categories'].some((param) =>
    Boolean(searchParams.get(param)?.trim())
  );

  const { width } = useWindowSize();
  const { categoriesTree } = useCategories();

  const categoryParam = searchParams.get('categories');

  const leafValues = categoryParam?.split(',').map((item) => item.trim()) || [];
  const resolvedPaths = leafValues
    .map((leaf) => findPathByValue(categoriesTree, leaf))
    .filter((p) => p.length);

  const isTablet = width <= SCREEN_WIDTH.MD;

  const onChange = (value: string[][]) => {
    const updatedParams = handleCategoriesChange(
      value,
      categoriesTree,
      searchParams
    );

    setSearchParams(updatedParams);
  };

  const resetParams = () => setSearchParams({});

  const isCategorySelected = resolvedPaths.length > 0;
  const localTheme = setLocalTheme(isFocused, isCategorySelected);

  return (
    <div className={styles.container}>
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
          value={resolvedPaths}
          fieldNames={{ label: 'title', value: 'value', children: 'children' }}
          onFocus={() => setIsFocused(false)}
          onBlur={() => setIsFocused(true)}
          dropdownMatchSelectWidth={isTablet}
        />
      </ConfigProvider>
      {anyFiltersSelected && (
        <Button
          className={styles.button}
          onClick={resetParams}
          type={ButtonTypes.link}
          label="Скинути всі"
        />
      )}
    </div>
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
      paddingXXS: theme.space100,
      colorBorder: !isFocused || !isCategorySelected ? theme.N3 : theme.success,
    },
  },
});
