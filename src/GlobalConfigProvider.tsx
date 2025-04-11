import { ConfigProvider as AntConfigProvider } from 'antd';
import { ReactNode } from 'react';

import { theme } from 'src/config/theme';

const defaultData = {
  token: {
    fontFamily: theme.fontBody,
    colorError: theme.error,
    colorLinkHover: theme.primaryHover,
    colorTextPlaceholder: theme.N4,
  },
  components: {
    Divider: {
      colorText: theme.N4,
    },
    Button: {
      colorPrimaryHover: theme.primaryHover,
      colorPrimaryActive: theme.primary,
      colorPrimary: theme.primary,
      borderRadius: 12,
      fontSize: 16,
      controlOutline: 'none',
      colorBgContainerDisabled: theme.N3,
      colorTextDisabled: theme.N5,
      colorLink: theme.primary,
      colorLinkActive: theme.primaryHover,
    },
    Dropdown: {
      controlItemBgActive: theme.secondary,
      controlItemBgHover: theme.N3,
      borderRadiusLG: 16,
      controlPaddingHorizontal: 16,
      paddingBlock: 9,
    },
    Link: {
      colorLinkHover: theme.primary,
      colorInfoHover: theme.primary,
    },
    Checkbox: {
      colorPrimaryHover: theme.primary,
      colorPrimary: theme.primary,
      colorText: theme.N5,
    },
    Input: {
      hoverBorderColor: theme.N4,
      hoverBg: theme.secondaryLight,
      colorPrimary: theme.N6,
      colorText: theme.N6,
      colorPrimaryHover: theme.N4,
      controlOutline: 'none',
      activeBg: theme.secondaryLight,
      activeBorderColor: theme.N5,
      controlHeight: 48,
      fontSize: 16,
      borderRadius: 8,
    },
    Modal: {
      borderRadiusLG: 12,
      colorBgMask: 'rgba(0, 0, 0, 0.50)',
    },
    Tabs: {
      itemColor: theme.N5,
      colorPrimary: theme.N6,
      colorPrimaryHover: theme.primary,
      colorPrimaryActive: theme.primary,
    },
    Select: {
      fontSize: 16,
    },
    Notification: {
      paddingContentHorizontalLG: 20,
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
