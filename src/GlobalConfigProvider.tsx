import { ConfigProvider as AntConfigProvider } from 'antd';
import { ReactNode } from 'react';

import { theme } from 'src/config/theme';

const defaultData = {
  token: {
    fontFamily: theme.fontFamily,
    colorError: '#EA2A2A',
    colorLinkHover: '#074A5E',
  },
  components: {
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
      colorText: '#4F4F4F',
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
    Modal: {
      borderRadiusLG: 12,
      colorBgMask: 'rgba(0,0,0,0.50)',
    },
    Tabs: {
      itemColor: '#4F4F4F',
      colorPrimary: '#1d1617',
      colorPrimaryHover: '#003342',
      colorPrimaryActive: '#003342',
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
