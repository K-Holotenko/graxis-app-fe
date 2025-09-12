import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { App, ConfigProvider, Menu } from 'antd';

import { ROUTES } from 'src/router/routes';
import { theme } from 'src/config/theme';
import { Button } from 'src/components/Button';
import { ButtonTypes } from 'src/config/constants';
import { useAuthStore } from 'src/stores/authStore';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { SidebarProps } from 'src/layouts/ProfileLayout';

import styles from './styles.module.scss';

interface MenuItemProps {
  key: string;
  label: React.ReactNode;
  isTwoLines?: boolean;
}

const items: MenuItemProps[] = [
  { key: ROUTES.USER_PROFILE, label: 'Профіль' },
  { key: ROUTES.NOTIFICATIONS_BASE, label: 'Повідомлення' },
  {
    key: ROUTES.PRIVACY_POLICY,
    label: 'Політика конфіденційності',
    isTwoLines: true,
  },
  { key: ROUTES.FAQ, label: 'Питання та відповіді', isTwoLines: true },
];

export const Sidebar = ({ onTabClick }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { signOut } = useAuthStore();
  const { openNotification } = useNotification();
  const { modal } = App.useApp();

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
    onTabClick?.();
  };

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const getSelectedKeys = (): string[] => {
    const { pathname } = location;

    if (matchPath({ path: ROUTES.NOTIFICATIONS }, pathname)) {
      return [ROUTES.NOTIFICATIONS_BASE];
    }

    const exactMatch = items.find((item) => item.key === pathname);

    if (exactMatch) {
      return [exactMatch.key];
    }

    return [];
  };

  const handleSignOut = () => {
    modal.confirm({
      title: 'Ви впевнені, що хочете завершити сеанс?',
      className: styles.customModal,
      centered: true,
      okText: 'Вийти',
      cancelText: 'Скасувати',
      okType: 'danger',
      onOk: async () => {
        await signOut(showError);
      },
    });
  };

  return (
    <div className={styles.sidebarContainer}>
      <ConfigProvider theme={localTheme}>
        <Menu
          onClick={handleMenuClick}
          selectedKeys={getSelectedKeys()}
          className={styles.menu}
        >
          {items.map(({ key, label, isTwoLines }) => (
            <Menu.Item
              key={key}
              className={isTwoLines ? styles.menuItemTwoLines : ''}
            >
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </ConfigProvider>
      <Button label="Вийти" type={ButtonTypes.link} onClick={handleSignOut} />
    </div>
  );
};

const localTheme = {
  components: {
    Menu: {
      itemHeight: 48,
      colorSplit: theme.N1,
      itemMarginInline: 0,
      itemMarginBlock: 12,
      fontSize: 16,
      colorText: theme.N5,
      itemHoverBg: theme.N3,
      itemSelectedBg: theme.secondary,
      itemActiveBg: theme.secondary,
      itemSelectedColor: theme.N6,
      borderRadius: 8,
      itemPaddingInline: 8,
      itemHoverColor: theme.N6,
    },
  },
};
