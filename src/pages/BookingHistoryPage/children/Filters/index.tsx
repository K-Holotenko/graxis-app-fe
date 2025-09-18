import { Select, ConfigProvider } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

import { theme } from 'src/config/theme';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

import styles from './styles.module.scss';
import { roleOptions, sortingOptions, statusOptions } from './utils';

interface FiltersProps {
  setOpen?: (open: boolean) => void;
}

export const Filters = ({ setOpen }: FiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;

  const handleParamChange = useCallback(
    (paramName: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (value) {
        newParams.set(paramName, value);
      } else {
        newParams.delete(paramName);
      }

      if (isMobile && setOpen) {
        setOpen(false);
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const handleClear = useCallback(
    (paramName: string) => {
      const newParams = new URLSearchParams(searchParams);

      newParams.delete(paramName);

      setSearchParams(newParams);
    },
    [setSearchParams]
  );

  return (
    <div
      className={`${styles.container} ${setOpen ? styles.containerMobile : ''}`}
    >
      <div className={styles.filter}>
        <p className={styles.label}>Статус</p>
        <ConfigProvider theme={localTheme(true)}>
          <Select
            rootClassName={styles.select}
            options={statusOptions}
            popupMatchSelectWidth={isMobile}
            value={searchParams.get('status')}
            onSelect={(value) => handleParamChange('status', value)}
            placeholder="Усі статуси"
            onClear={() => handleClear('status')}
            allowClear
          />
        </ConfigProvider>
      </div>
      <ConfigProvider theme={localTheme(false)}>
        <div className={styles.filter}>
          <p className={styles.label}>Роль</p>
          <Select
            rootClassName={styles.select}
            options={roleOptions}
            popupMatchSelectWidth={isMobile}
            value={searchParams.get('role')}
            onSelect={(value) => handleParamChange('role', value)}
            placeholder="Усі ролі"
            onClear={() => handleClear('role')}
            allowClear
          />
        </div>
        <div className={styles.filter}>
          <p className={styles.label}>Сортування</p>
          <Select
            rootClassName={styles.select}
            options={sortingOptions}
            popupMatchSelectWidth={isMobile}
            value={searchParams.get('sorting')}
            onSelect={(value) => handleParamChange('sorting', value)}
            placeholder="Усі сортування"
            onClear={() => handleClear('sorting')}
            allowClear
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

const localTheme = (isStatus: boolean) => ({
  token: {
    borderRadius: 8,
    controlHeight: 48,
  },
  components: {
    Select: {
      optionActiveBg: theme.N2,
      optionSelectedBg: theme.N2,
      colorPrimary: theme.N5,
      hoverBorderColor: theme.N4,
      activeBorderColor: theme.N5,
      optionHeight: isStatus ? 20 : 48,
      optionLineHeight: isStatus ? 1 : 1.7,
      optionPadding: '10px 20px',
      fontSize: 16,
    },
  },
});
