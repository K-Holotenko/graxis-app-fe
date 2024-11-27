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
      fontSize: number;
    };
    Select: {
      fontSize: number;
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
      fontSize: theme.fontSize16,
    },
    Tabs: {
      colorPrimary: theme.textPrimaryColor,
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
