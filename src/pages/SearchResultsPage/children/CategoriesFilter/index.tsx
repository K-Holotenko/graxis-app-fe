import { useEffect, useState } from 'react';
import { Cascader, ConfigProvider } from 'antd';

import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import ArrowRight from 'src/assets/icons/arrow-right-icon.svg?react';
import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useCategories } from 'src/hooks/useCategories';

import styles from './styles.module.scss';

interface CategoriesFilterProps {
  selectedCategories: string[][];
  onChange: (value: string[][]) => void;
}

export const CategoriesFilter = ({
  selectedCategories,
  onChange,
}: CategoriesFilterProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const { width } = useWindowSize();
  const { categoriesTree } = useCategories();
  const isTablet = width <= SCREEN_WIDTH.MD;

  useEffect(() => {
    setIsCategorySelected(selectedCategories.length > 0);
  }, [selectedCategories]);

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
        value={selectedCategories}
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
