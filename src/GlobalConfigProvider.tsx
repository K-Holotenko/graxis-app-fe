import { ConfigProvider as AntConfigProvider } from 'antd';
import { ReactNode } from 'react';

import { theme } from 'src/config/theme';

const defaultData = {
  token: {
    fontFamily: theme.fontFamily,
  },
  components: {
    colorLinkHover: '#074A5E',
    Button: {
      colorPrimaryHover: '#074A5E',
      colorPrimaryActive: theme.primaryColor,
      colorPrimary: theme.primaryColor,
      borderRadius: theme.buttonBorderRadius,
      fontSize: theme.fontSize16,
      controlOutline: 'none',
      colorBgContainerDisabled: '#EAEAEA',
      colorTextDisabled: '#4F4F4F',
    },
    Link: {
      colorLinkHover: theme.primaryColor,
      colorInfoHover: theme.primaryColor,
    },
    Checkbox: {
      colorPrimaryHover: theme.primaryColor,
      colorPrimary: theme.primaryColor,
    },
    Input: {
      hoverBorderColor: '#B8B2B2',
      hoverBg: '#FCFFE8',
      colorPrimary: '#1D1617',
      colorPrimaryHover: '#B8B2B2',
      controlOutline: 'none',
      activeBg: '#fcffe8',
      activeBorderColor: '#4F4F4F',
      controlHeight: 48,
      fontSize: 16,
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

interface GlobalConfigProviderProps {
  children: ReactNode;
}

export const GlobalConfigProvider = ({
  children,
}: GlobalConfigProviderProps) => (
  <AntConfigProvider theme={defaultData}>{children}</AntConfigProvider>
);
