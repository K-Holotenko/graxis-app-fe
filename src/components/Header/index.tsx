import { useEffect, useMemo, useState } from 'react';
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
  App,
} from 'antd';
import { generatePath, Link, useNavigate } from 'react-router-dom';

import notificationIconSrc from 'src/assets/icons/notification-icon.svg';
import PlusIcon from 'src/assets/icons/plus-icon.svg?react';
import UserIcon from 'src/assets/icons/user-icon.svg?react';
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
import { PublicationFilters } from 'src/stores/myPublicationStore';
import { useNotificationStore } from 'src/stores/notificationStore';
import { getNotificationMenu } from 'src/utils/notificationsUtils';

import styles from './styles.module.scss';

export const AppHeader = () => {
  const navigate = useNavigate();
  const { modal } = App.useApp();

  const { width } = useWindowSize();
  const { user, signOut, isAppInitializing } = useAuthStore();
  const {
    unreadNotifications,
    isUnreadNotificationsLoading,
    showBadge,
    getAllUnreadNotifications,
    subscribeToNotificationUpdate,
    markNotificationAsRead,
  } = useNotificationStore();
  const { openNotification } = useNotification();

  const { requireAuth } = useRequireAuth();

  const [showDrawer, setShowDrawer] = useState(false);

  const shouldShowAddPublicationButton = useMemo(
    () => window.location.pathname !== ROUTES.ADD_PUBLICATION,
    [window.location.pathname]
  );

  const isDesktop = useMemo(() => width > SCREEN_WIDTH.MD, [width]);

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const handleNotificationOpenChange = (open: boolean) => {
    if (open) {
      getAllUnreadNotifications(showError);
    }
  };

  useEffect(() => {
    if (isDesktop) {
      setShowDrawer(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (user) {
      getAllUnreadNotifications(showError);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToNotificationUpdate();

      return () => unsubscribe();
    }
  }, [user]);

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

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const actions: { [key: string]: () => void } = {
      1: () =>
        navigate(
          generatePath(ROUTES.MY_PUBLICATIONS, {
            tab: PublicationFilters.LISTED,
          })
        ),
      2: () => navigate(ROUTES.USER_PROFILE),
      4: () => navigate(ROUTES.BOOKINGS_HISTORY),
      3: handleSignOut,
    };

    actions[e.key]();
  };

  const menu = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  const handleNotificationClick: MenuProps['onClick'] = async (e) => {
    await markNotificationAsRead(e.key, showError);
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
          </Row>
          <Row gutter={30} align="middle" wrap={false}>
            {user && (
              <Col>
                <ConfigProvider theme={localTheme}>
                  <Dropdown
                    rootClassName={styles.notificationDropdown}
                    menu={getNotificationMenu(
                      unreadNotifications || [],
                      handleNotificationClick,
                      isUnreadNotificationsLoading
                    )}
                    placement="bottomRight"
                    trigger={['click']}
                    onOpenChange={handleNotificationOpenChange}
                  >
                    <Badge dot={showBadge} className={styles.notificationIcon}>
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
