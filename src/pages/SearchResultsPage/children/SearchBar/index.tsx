import { ChangeEvent, useEffect, useRef } from 'react';
import { Space, Select, ConfigProvider, InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

import MapPinSrc from 'src/assets/icons/map-pin-icon.svg?react';
import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import { Input } from 'src/components/Input';
import { CITY_LIST, TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<InputRef>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setSearchParams({ q: e.target.value });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { q, ...rest } = Object.fromEntries(searchParams);

      setSearchParams(rest);
    }
  };

  const handleSearch = () => {
    //TODO: Implement search logic
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
          value={searchParams.get('q') || ''}
          onChange={handleInput}
          onPressEnter={handleSearch}
        />
        <ConfigProvider theme={localTheme}>
          <Select
            popupMatchSelectWidth={false}
            popupClassName={styles.selectPopup}
            rootClassName={styles.select}
            defaultValue={CITY_LIST[0]}
            options={CITY_LIST}
            prefix={<MapPinSrc />}
            suffixIcon={<ArrowDown />}
            style={{
              width: '100%',
              minWidth: 137,
            }}
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
