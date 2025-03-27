import { KeyboardEvent, RefObject } from 'react';
import { Space, Select, ConfigProvider, InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import MapPinSrc from 'src/assets/icons/map-pin-icon.svg?react';
import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import { Input } from 'src/components/Input';
import { CITY_LIST, TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';

interface SearchBarProps {
  inputRef: RefObject<InputRef | null>;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ inputRef, onKeyDown }: SearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onKeyDown(e);
    }
  };

  return (
    <div className={styles.searchBarWrapper}>
      <Space.Compact size="large" className={styles.space}>
        <Input
          ref={inputRef}
          placeholder={TEXT.INPUT_SEARCH}
          prefix={<SearchOutlined />}
          onPressEnter={handleKeyDown}
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
