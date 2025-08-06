import { ConfigProvider, Input } from 'antd';
import { ChangeEvent } from 'react';

import { theme } from 'src/config/theme';

export const NumberInput = ({
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  prefix,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  prefix?: string;
  className?: string;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(/\D/g, ''));
  };

  const handleBlur = () => {
    if (!value) return;
    onChange(Number(value).toFixed(2));
    onBlur?.();
  };

  const handleFocus = () => {
    if (!value) {
      return;
    }

    onChange(value.split('.')[0] || '');
    onFocus?.();
  };

  return (
    <ConfigProvider theme={localTheme}>
      <Input
        prefix={prefix}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        maxLength={16}
        className={className}
      />
    </ConfigProvider>
  );
};

const localTheme = {
  token: {
    colorBorder: theme.N3,
  },
  components: {
    Input: {
      inputFontSize: 16,
      lineHeight: 1.5,
    },
  },
};
