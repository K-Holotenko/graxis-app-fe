import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Avatar,
  Dropdown,
  Badge,
  Image,
  MenuProps,
  ConfigProvider,
  Skeleton,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

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
  TEXT,
  SCREEN_WIDTH,
} from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ROUTES } from 'src/router/routes';
import { Drawer } from 'src/components/Drawer';
import { Button } from 'src/components/Button';
import { theme } from 'src/config/theme';
import { useCountdown } from 'src/hooks/useCountdown';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { useUserStore } from 'src/stores/userStore';
import { Loadable } from 'src/components/Loadable';

import styles from './styles.module.scss';

const menuItems = [
  {
    key: '1',
    label: TEXT.MY_PUBLICATIONS,
  },
  {
    key: '2',
    label: TEXT.SETTINGS,
  },
  {
    key: '3',
    label: TEXT.LOGOUT,
  },
];

export const AppHeader = () => {
  const navigate = useNavigate();

  const { width } = useWindowSize();
  const { timer, startCountdown } = useCountdown(5);
  const { isAuthorized, signOut } = useAuthStore();
  const { user, isAppInitializing } = useUserStore();
  const { openNotification } = useNotification();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasNotifications] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      navigate(ROUTES.LOGIN);
      setIsNotificationOpen(false);
    }
  }, [navigate, timer]);

  const shouldShowAddPublicationButton =
    window.location.pathname !== ROUTES.ADD_PUBLICATION;

  const isDesktop = width > SCREEN_WIDTH.MD;
  const isFullyAuthorized = isAuthorized && !!user;

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const onAddPublicationBtnClick = (): void => {
    if (isFullyAuthorized) {
      navigate(ROUTES.ADD_PUBLICATION);

      return;
    }

    if (isNotificationOpen) {
      return;
    }

    startCountdown();
    setIsNotificationOpen(true);
    openNotification(
      NotificationType.INFO,
      'Будь ласка, авторизуйтесь',
      'Авторизуйтеся, щоб продовжити. Автоперехід через 5 секунд...',
      <Button
        label="Авторизуватися"
        type={ButtonTypes.link}
        className={styles.notificationButtonPadding}
        onClick={() => navigate(ROUTES.LOGIN)}
      />
    );
  };

  useEffect(() => {
    if (isDesktop) {
      setShowDrawer(false);
    }
  }, [isDesktop]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const actions: { [key: string]: () => void } = {
      '1': () => navigate(ROUTES.MY_PUBLICATIONS),
      '2': () => navigate(ROUTES.USER_PROFILE),
      '3': () => signOut(showError),
    };

    actions[e.key]();
  };

  const menu = {
    items: menuItems,
    onClick: handleMenuClick,
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
            {isFullyAuthorized && (
              <Col>
                <Badge dot={hasNotifications}>
                  <Image
                    src={notificationIconSrc}
                    alt={IMAGE_DESCRIPTION.LOGO}
                    preview={false}
                  />
                </Badge>
              </Col>
            )}
            {isDesktop && shouldShowAddPublicationButton && (
              <Col className={styles.buttonPaddingCall}>
                <Button
                  type={ButtonTypes.primary}
                  icon={<PlusIcon />}
                  iconPosition="end"
                  onClick={onAddPublicationBtnClick}
                  dataTestId="add-publication-btn"
                  label="Додати оголошення"
                />
              </Col>
            )}
            {!isFullyAuthorized && isDesktop && !isAppInitializing && (
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
            {(isFullyAuthorized || isAppInitializing) && isDesktop && (
              <Col>
                <ConfigProvider theme={localTheme}>
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
                </ConfigProvider>
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
    Dropdown: {
      controlItemBgHover: theme.N3,
      borderRadiusLG: 16,
      controlPaddingHorizontal: 16,
      paddingBlock: 9,
    },
  },
};
