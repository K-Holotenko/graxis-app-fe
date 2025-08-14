import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Avatar,
  Dropdown,
  Badge,
  Image,
  MenuProps,
  Skeleton,
  ConfigProvider,
} from 'antd';
import { generatePath, Link, useNavigate } from 'react-router-dom';

import notificationIconSrc from 'src/assets/icons/notification-icon.svg';
import PlusIcon from 'src/assets/icons/plus-icon.svg?react';
import UserIcon from 'src/assets/icons/user-icon.svg?react';
import { SelectLocation } from 'src/components/SelectLocation';
import { Logo } from 'src/components/Logo';
import { useAuthStore } from 'src/stores/authStore';
import DrawerIcon from 'src/assets/icons/drawer-icon.svg?react';
import {
  IMAGE_DESCRIPTION,
  ButtonTypes,
  SCREEN_WIDTH,
} from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ROUTES } from 'src/router/routes';
import { Drawer, menuItems } from 'src/components/Drawer';
import { Button } from 'src/components/Button';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { Loadable } from 'src/components/Loadable';
import { useRequireAuth } from 'src/hooks/useRequireAuth';
import { Notification } from 'src/components/Notification';
import { PublicationFilters } from 'src/stores/myPublicationStore';

import styles from './styles.module.scss';

export const AppHeader = () => {
  const navigate = useNavigate();

  const { width } = useWindowSize();
  const { user, signOut, isAppInitializing } = useAuthStore();
  const { openNotification } = useNotification();
  const { requireAuth } = useRequireAuth();

  const [hasNotifications] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const shouldShowAddPublicationButton =
    window.location.pathname !== ROUTES.ADD_PUBLICATION;

  const isDesktop = width > SCREEN_WIDTH.MD;

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  useEffect(() => {
    if (isDesktop) {
      setShowDrawer(false);
    }
  }, [isDesktop]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const actions: { [key: string]: () => void } = {
      1: () =>
        navigate(
          generatePath(ROUTES.MY_PUBLICATIONS, {
            tab: PublicationFilters.LISTED,
          })
        ),
      2: () => navigate(ROUTES.USER_PROFILE),
      3: () => signOut(showError),
    };

    actions[e.key]();
  };

  const menu = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  // TODO: Fetch notifications from backend
  const notificationMenu = {
    items: [
      {
        key: '1',
        label: (
          <Notification
            title="Нова нотифікація з довгим заголовком"
            description="Детальний опис нотифікації нотифікації"
            time="00:00"
            date="12.07.2025"
            seen={false}
            id="1"
          />
        ),
      },
      {
        key: '2',
        label: (
          <Notification
            title="Нова нотифікація"
            description="Детальний опис нотифікації нотифікації"
            time="00:00"
            date="12.07.2025"
            seen={false}
            id="1"
          />
        ),
      },
    ],
  };

  return (
    <>
      <header className={`container ${styles.headerContainer}`}>
        <Row className={styles.appHeader} justify="space-between" wrap={false}>
          <Row gutter={16} align="middle">
            {!isDesktop && (
              <Col>
                <DrawerIcon
                  onClick={() => setShowDrawer(true)}
                  className={styles.drawerIcon}
                />
              </Col>
            )}
            <Col>
              <Link to={ROUTES.HOME}>
                <Logo className={styles.logo} />
              </Link>
            </Col>
            {isDesktop && (
              <Col>
                <SelectLocation />
              </Col>
            )}
          </Row>
          <Row gutter={30} align="middle" wrap={false}>
            {user && (
              <Col>
                <ConfigProvider theme={localTheme}>
                  <Dropdown
                    rootClassName={styles.notificationDropdown}
                    menu={notificationMenu}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Badge
                      dot={hasNotifications}
                      className={styles.notificationIcon}
                    >
                      <Image
                        src={notificationIconSrc}
                        alt={IMAGE_DESCRIPTION.LOGO}
                        preview={false}
                      />
                    </Badge>
                  </Dropdown>
                </ConfigProvider>
              </Col>
            )}
            {isDesktop && shouldShowAddPublicationButton && (
              <Col className={styles.buttonPaddingCall}>
                <Button
                  type={ButtonTypes.primary}
                  icon={<PlusIcon />}
                  iconPosition="end"
                  onClick={requireAuth.bind(null, ROUTES.ADD_PUBLICATION)}
                  dataTestId="add-publication-btn"
                  label="Додати оголошення"
                />
              </Col>
            )}
            {!user && isDesktop && !isAppInitializing && (
              <Col className={styles.buttonPaddingCall}>
                <Button
                  type={ButtonTypes.default}
                  icon={<UserIcon />}
                  iconPosition="start"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  dataTestId="authorize-btn"
                  className={styles.buttonPadding}
                  label="Авторизуватися"
                />
              </Col>
            )}
            {(user || isAppInitializing) && isDesktop && (
              <Col>
                <Loadable
                  skeleton={
                    <Skeleton.Avatar
                      active
                      size="large"
                      style={{ width: '48px', height: '48px' }}
                    />
                  }
                  component={() => (
                    <Dropdown
                      rootClassName={styles.dropdownRoot}
                      menu={menu}
                      placement="bottom"
                      trigger={['click']}
                    >
                      <Avatar
                        size="large"
                        src={user?.avatarUrl}
                        className={styles.avatarLarge}
                      >
                        {user?.name?.charAt(0)}
                        {user?.surname?.charAt(0)}
                      </Avatar>
                    </Dropdown>
                  )}
                  isLoading={isAppInitializing}
                />
              </Col>
            )}
          </Row>
        </Row>
      </header>
      {showDrawer && (
        <Drawer open={showDrawer} onClose={() => setShowDrawer(false)} />
      )}
    </>
  );
};

const localTheme = {
  components: {
    Menu: {
      itemHoverBg: 'white',
    },
  },
};
