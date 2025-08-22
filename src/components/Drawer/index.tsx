import {
  Col,
  ConfigProvider,
  Drawer as AntDrawer,
  Row,
  Typography,
  Dropdown,
  Avatar,
  MenuProps,
  Skeleton,
  App,
} from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';

import { PublicationFilters } from 'src/stores/myPublicationStore';
import CloseIcon from 'src/assets/icons/close-icon.svg?react';
import Logo from 'src/assets/icons/logo-light.svg?react';
import PlusIconDark from 'src/assets/icons/plus-icon-dark.svg?react';
import UserIconDark from 'src/assets/icons/user-icon-dark.svg?react';
import { theme } from 'src/config/theme';
import { useAuthStore } from 'src/stores/authStore';
import { SelectLocation } from 'src/components/SelectLocation';
import { ButtonTypes } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';
import { Button } from 'src/components/Button';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { useRequireAuth } from 'src/hooks/useRequireAuth';
import { Loadable } from 'src/components/Loadable';

import styles from './styles.module.scss';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export const menuItems = [
  {
    key: 1,
    label: 'Мої оголошення',
  },
  {
    key: 2,
    label: 'Профіль',
  },
  {
    key: 3,
    label: 'Вийти',
  },
];

export const Drawer = ({ open, onClose }: DrawerProps) => {
  const { user, isLoading, signOut } = useAuthStore();
  const { modal } = App.useApp();

  const { requireAuth } = useRequireAuth();
  const { openNotification } = useNotification();

  const navigate = useNavigate();

  const shouldShowAddPublicationButton =
    window.location.pathname !== ROUTES.ADD_PUBLICATION;

  const name = user?.name;
  const surname = user?.surname;

  const isName = !!name;
  const isSurname = !!surname;
  const isFullName = isName && isSurname;

  const nameLetter = isName && name.charAt(0);
  const surnameLetter = isSurname && surname.charAt(0);

  const usernameABBR = isFullName
    ? `${nameLetter}${surnameLetter}`
    : nameLetter;

  const username = isFullName ? `${name} ${surname}` : name;

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
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

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const actions: { [key: string]: () => void } = {
      1: () =>
        navigate(
          generatePath(ROUTES.MY_PUBLICATIONS, {
            tab: PublicationFilters.LISTED,
          })
        ),
      2: () => navigate(ROUTES.USER_PROFILE),
      3: handleSignOut,
    };

    actions[e.key]();
    onClose();
  };

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
    onClose();
  };

  const menu = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  return (
    <AntDrawer
      className={styles.headerDrawer}
      closeIcon={null}
      open={open}
      placement="left"
      width="100%"
      extra={<CloseIcon onClick={onClose} className={styles.drawerCloseBtn} />}
      title={<Logo onClick={handleLogoClick} className={styles.logo} />}
      style={{
        backgroundColor: theme.primary,
      }}
    >
      {user && (
        <Row className={styles.userSection} align="middle" justify="center">
          <Col span={24}>
            <ConfigProvider theme={localThemeDropdown}>
              <Loadable
                skeleton={
                  <Skeleton.Avatar
                    active
                    size="large"
                    style={{ width: 40, height: 40 }}
                  />
                }
                component={() => (
                  <Dropdown
                    menu={menu}
                    placement="bottom"
                    trigger={['click']}
                    rootClassName={styles.dropdownRoot}
                  >
                    <div className={styles.avatarSection}>
                      <Avatar
                        size="large"
                        src={user?.avatarUrl}
                        className={styles.avatarLarge}
                      >
                        {usernameABBR}
                      </Avatar>
                      <span className={styles.userSectionUsername}>
                        {username}
                      </span>
                    </div>
                  </Dropdown>
                )}
                isLoading={isLoading}
              />
            </ConfigProvider>
          </Col>
        </Row>
      )}
      {!user && (
        <Row>
          <Col span={24}>
            <ConfigProvider theme={localThemeAuth}>
              <Button
                type={ButtonTypes.default}
                icon={<UserIconDark />}
                iconPosition="start"
                onClick={() => navigate(ROUTES.LOGIN)}
                label="Авторизуватися"
              />
            </ConfigProvider>
          </Col>
        </Row>
      )}
      {shouldShowAddPublicationButton && (
        <Row className={styles.verticalPadding}>
          <Col span={24}>
            <ConfigProvider theme={localThemeAddPublication}>
              <Button
                type={ButtonTypes.primary}
                icon={<PlusIconDark />}
                iconPosition="end"
                className={styles.addPublicationButton}
                onClick={requireAuth.bind(null, ROUTES.ADD_PUBLICATION)}
                dataTestId="add-publication-btn"
                label="Додати оголошення"
              />
            </ConfigProvider>
          </Col>
        </Row>
      )}
      <Row className={styles.verticalPadding}>
        <Col span={24}>
          <Typography className={styles.locationTitle}>
            Виберіть локацію
          </Typography>
        </Col>
      </Row>
      <Row className={styles.drawerVerticalPadding}>
        <Col span={24}>
          <SelectLocation />
        </Col>
      </Row>
    </AntDrawer>
  );
};

const localThemeAuth = {
  components: {
    Button: {
      colorPrimaryHover: theme.secondaryHover,
      colorPrimary: theme.secondary,
      colorText: theme.secondary,
      colorBgContainer: theme.primary,
      colorBorder: theme.secondary,
    },
  },
};

const localThemeAddPublication = {
  components: {
    Button: {
      colorPrimaryHover: theme.secondaryHover,
      colorPrimary: theme.secondary,
      colorPrimaryActive: theme.secondaryHover,
    },
  },
};

const localThemeDropdown = {
  components: {
    Dropdown: {
      colorText: theme.N1,
      colorBgElevated: theme.primary,
    },
  },
};
