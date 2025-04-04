import { KeyboardEvent, ChangeEvent, useEffect, useRef, useState } from 'react';
import { Space, Select, ConfigProvider, InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

import MapPinSrc from 'src/assets/icons/map-pin-icon.svg?react';
import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import { Input } from 'src/components/Input';
import { CITY_LIST, TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { getCurrentCityOption } from 'src/pages/SearchPage/children/Filters/utils/filters';

import styles from './styles.module.scss';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchValue = searchParams.get('title') || undefined;
  const cityValue = searchParams.get('city') || undefined;

  const [value, setValue] = useState<string | undefined>(defaultSearchValue);
  const inputRef = useRef<InputRef>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value || '');
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length) {
      setSearchParams({ title: e.currentTarget.value });
    } else {
      const newParams = new URLSearchParams(searchParams);

      newParams.delete('title');
      setSearchParams(newParams);
    }
  };

  const handleCityChange = (city: string) => {
    // Create new params to preserve existing filters
    const newParams = new URLSearchParams(searchParams);

    if (city.length) {
      newParams.set('city', city);
    } else {
      newParams.delete('city');
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.searchBarWrapper}>
      <Space.Compact size="large" className={styles.space}>
        <Input
          ref={inputRef}
          placeholder={TEXT.INPUT_SEARCH}
          prefix={<SearchOutlined />}
          value={value}
          onChange={handleInput}
          onPressEnter={handleSearch}
          maxLength={150}
        />
        <ConfigProvider theme={localTheme}>
          <Select
            onChange={handleCityChange}
            popupMatchSelectWidth={false}
            rootClassName={styles.select}
            popupClassName={styles.selectPopup}
            value={getCurrentCityOption(cityValue, CITY_LIST)}
            placeholder="Місто"
            options={CITY_LIST}
            prefix={<MapPinSrc />}
            suffixIcon={<ArrowDown />}
            style={{ width: '100%', minWidth: 137 }}
          />
        </ConfigProvider>
      </Space.Compact>
    </div>
  );
};

const localTheme = {
  components: {
    Select: {
      singleItemHeightLG: 48,
      optionSelectedFontWeight: 'regular',
      optionFontSize: 16,
      optionHeight: 32,
      optionLineHeight: 2,
      paddingXXS: 8,
      hoverBorderColor: theme.N4,
      activeBorderColor: theme.N5,
      activeOutlineColor: 'none',
      optionSelectedBg: theme.N2,
    },
  },
};
