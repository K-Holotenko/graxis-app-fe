import { ConfigProvider as AntConfigProvider } from 'antd';
import { ReactNode } from 'react';

import { theme } from 'src/config/theme';

const defaultData = {
  token: {
    fontFamily: theme.fontFamily,
  },
  components: {
    Button: {
      colorPrimaryHover: '#074A5E',
      colorPrimary: theme.primaryColor,
      borderRadius: theme.buttonBorderRadius,
      fontSize: theme.fontSize16,
      controlOutline: 'none',
      colorFillQuaternary: 'none',
      boxShadowTertiary: 'none',
      colorFillAlter: 'none',
    },
    Checkbox: {
      colorPrimaryHover: theme.primaryColor,
      colorPrimary: theme.primaryColor,
    },
    Input: {
      colorPrimary: theme.textSecondaryColor,
      colorPrimaryHover: '#B8B2B2',
      controlOutline: 'none',
    },
    Tabs: {
      colorPrimary: theme.textPrimaryColor,
      colorPrimaryHover: theme.primaryColor,
      colorPrimaryActive: theme.primaryColor,
    },
    Select: {
      fontSize: theme.fontSize16,
    },
  },
};

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => (
  <AntConfigProvider theme={defaultData}>{children}</AntConfigProvider>
);
