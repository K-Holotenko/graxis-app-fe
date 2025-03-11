import { useState } from 'react';
import { Cascader, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';

import ArrowDown from 'src/assets/icons/arrow-down-light-icon.svg?react';
import ArrowRight from 'src/assets/icons/arrow-right-icon.svg?react';
import { CATEGORIES_DROP_DATA } from 'src/pages/AddPublicationPage/children/CategoriesDropdown/utils/config';
import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';

import styles from './styles.module.scss';

export const CategoriesFilter = () => {
  const [selectedValues, setSelectedValues] = useState<string[][]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isTablet = width <= SCREEN_WIDTH.MD;

  const onChange = (value: string[][]) => {
    setSelectedValues(value);
    setIsCategorySelected(value.length > 0);
    const categories = value.map((path) => path[path.length - 1]).join('&');
    const newSearch = categories ? `?categories=${categories}` : '';

    navigate(newSearch, { replace: true });
  };

  const combinedTheme = {
    components: {
      ...localTheme.components,
      Select: {
        ...localTheme.components.Select,
        colorBorder:
          !isFocused || !isCategorySelected ? theme.N3 : theme.success,
      },
    },
  };

  return (
    <ConfigProvider theme={combinedTheme}>
      <Cascader
        className={styles.cascader}
        allowClear={false}
        expandIcon={<ArrowRight className={styles.expandIcon} />}
        suffixIcon={<ArrowDown />}
        popupClassName={styles.popup}
        options={CATEGORIES_DROP_DATA}
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

const localTheme = {
  token: {
    colorBorder: theme.N3,
    colorText: theme.N6,
    boxShadowSecondary: '0 8px 28px 0 rgba(70, 68, 88, 0.08)',
  },
  components: {
    Cascader: {
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
    },
  },
};
