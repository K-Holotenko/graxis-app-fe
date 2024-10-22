import { ReactNode } from 'react';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { theme } from '../../../config/theme';

type ThemeData = {
  token: {
    fontFamily: string;
  };
  components: {
    Button: {
      colorPrimary: string;
      borderRadius: number;
    };
    Tabs: {
      colorPrimary: string;
    };
  };
};

const defaultData: ThemeData = {
  token: {
    fontFamily: theme.fontFamily,
  },
  components: {
    Button: {
      colorPrimary: theme.primaryColor,
      borderRadius: theme.buttonBorderRadius,
    },
    Tabs: {
      colorPrimary: theme.textPrimaryColor,
    },
  },
};

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => (
  <AntConfigProvider theme={defaultData}>{children}</AntConfigProvider>
);
