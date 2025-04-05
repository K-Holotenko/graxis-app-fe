import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Menu } from 'antd';

import { ROUTES } from 'src/router/routes';
import { theme } from 'src/config/theme';
import { Button } from 'src/components/Button';
import { ButtonTypes } from 'src/config/constants';
import { useAuthStore } from 'src/stores/authStore';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { SidebarProps } from 'src/layouts/ProfileLayout';

import styles from './styles.module.scss';

const items = [
  {
    key: ROUTES.USER_PROFILE,
    label: 'Профіль',
  },
  {
    key: ROUTES.NOTIFICATIONS,
    label: 'Повідомлення',
  },
  {
    key: ROUTES.PAYMENT,
    label: 'Платіжна інформація',
  },
  {
    key: ROUTES.PRIVACY_POLICY,
    label: 'Політика конфіденційності',
  },
  {
    key: ROUTES.FAQ,
    label: 'Питання та відповіді',
  },
];

export const Sidebar = ({ onTabClick }: SidebarProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();
  const { openNotification } = useNotification();

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
    onTabClick?.();
  };

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  return (
    <div className={styles.sidebarContainer}>
      <ConfigProvider theme={localTheme}>
        <Menu
          onClick={handleMenuClick}
          className={styles.menu}
          mode="vertical"
          items={items}
        />
      </ConfigProvider>
      <Button
        label="Вийти"
        type={ButtonTypes.link}
        onClick={() => signOut(showError)}
        className={styles.btn}
      />
    </div>
  );
};

const localTheme = {
  components: {
    Menu: {
      colorSplit: theme.N1,
      lineHeight: 1.5,
      itemMarginInline: 0,
      itemMarginBlock: 12,
      fontSize: 16,
      colorText: theme.N5,
      itemHoverBg: theme.N3,
      itemSelectedBg: theme.secondary,
      itemSelectedColor: theme.N6,
      borderRadius: 8,
      itemPaddingInline: 8,
      itemHoverColor: theme.N6,
    },
  },
};
