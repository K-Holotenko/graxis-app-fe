import { useRef, useState, useMemo } from 'react';
import AutoComplete from 'antd/es/auto-complete';
import { Space, Select, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

import MapPinSrc from 'src/assets/icons/map-pin-icon.svg?react';
import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import { CITY_LIST } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { getCurrentCityOption } from 'src/pages/SearchPage/children/Filters/utils/filters';
import { debounce } from 'src/utils/debounce';
import { getLiveSearchOptions } from 'src/services/PublicationService';

import styles from './styles.module.scss';

interface LiveSearchOption {
  key: string;
  label: string;
  value: string;
}

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchValue = searchParams.get('title') || undefined;
  const cityValue = searchParams.get('city') || undefined;

  const [value, setValue] = useState<string | undefined>(defaultSearchValue);

  const fetchRef = useRef(0);

  const [options, setOptions] = useState<LiveSearchOption[]>([]);

  const handleInput = (inputValue: string) => {
    setValue(inputValue || '');
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (searchValue: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      setOptions([]);

      getLiveSearchOptions(searchValue).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(
          newOptions.map((option) => ({
            key: option.id,
            label: option.title,
            value: option.title,
          }))
        );
      });
    };

    return debounce(loadOptions, 500);
  }, [getLiveSearchOptions]);

  const handleSelect = (selectedValue: string) => {
    // Create new params to preserve existing filters
    const newParams = new URLSearchParams(searchParams);

    if (selectedValue.length) {
      newParams.set('title', selectedValue);
    } else {
      newParams.delete('title');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handleCityChange = (city: string) => {
    // Create new params to preserve existing filters
    const newParams = new URLSearchParams(searchParams);

    if (city.length) {
      newParams.set('city', city);
    } else {
      newParams.delete('city');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const onClear = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('page');
    newParams.delete('title');
    setSearchParams(newParams);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && options.length > 0 && value) {
      handleSelect(value);
    }
  };

  return (
    <div className={styles.searchBarWrapper}>
      <ConfigProvider theme={localTheme}>
        <Space.Compact size="large" className={styles.space}>
          <AutoComplete
            placeholder="Пошук товару"
            prefix={<SearchOutlined />}
            allowClear={true}
            onClear={onClear}
            autoFocus
            maxLength={150}
            onSearch={debounceFetcher}
            onSelect={handleSelect}
            onChange={handleInput}
            onKeyDown={onKeyDown}
            className={styles.autocomplete}
            options={options}
            value={value}
            style={{ width: '100%' }}
          />
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
        </Space.Compact>
      </ConfigProvider>
    </div>
  );
};

const localTheme = {
  components: {
    Select: {
      singleItemHeightLG: 48,
      optionSelectedFontWeight: 'regular',
      optionFontSize: 14,
      optionHeight: 32,
      optionLineHeight: 2,
      paddingXXS: theme.space100,
      hoverBorderColor: theme.N4,
      activeBorderColor: theme.N5,
      activeOutlineColor: 'none',
      optionSelectedBg: theme.N2,
      colorText: theme.N6,
      colorTextPlaceholder: theme.N6,
      borderRadiusSM: 8,
      optionPadding: '5.5px 8px',
    },
  },
};
