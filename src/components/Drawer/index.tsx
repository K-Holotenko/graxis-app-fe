import {
  Col,
  ConfigProvider,
  Drawer as AntDrawer,
  Row,
  Typography,
  Dropdown,
  Avatar,
  MenuProps,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import CloseIcon from 'src/assets/icons/close-icon.svg?react';
import Logo from 'src/assets/icons/logo-light.svg?react';
import PlusIconDark from 'src/assets/icons/plus-icon-dark.svg?react';
import UserIconDark from 'src/assets/icons/user-icon-dark.svg?react';
import { theme } from 'src/config/theme';
import { useAuthStore } from 'src/stores/authStore';
import { SelectLocation } from 'src/components/SelectLocation';
import { ButtonTypes, TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';
import { Button } from 'src/components/Button';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { User, useUserStore } from 'src/stores/userStore';

import styles from './styles.module.scss';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export const menuItems = [
  {
    key: '1',
    label: 'Мої оголошення',
  },
  {
    key: '2',
    label: 'Профіль',
  },
  {
    key: '3',
    label: 'Вийти',
  },
];

export const Drawer = ({ open, onClose }: DrawerProps) => {
  const { isAuthorized, signOut } = useAuthStore();
  const { user } = useUserStore();

  const { openNotification } = useNotification();

  const navigate = useNavigate();
  const shouldShowAddPublicationButton =
    window.location.pathname !== ROUTES.ADD_PUBLICATION;

  const { name, surname } = user as User;
  const isName = !!name;
  const isSurname = !!surname;
  const isFullName = isName && isSurname;

  const nameLetter = isName && name.charAt(0);
  const surnameLetter = isSurname && surname.charAt(0);

  const usernameABBR = isFullName
    ? `${nameLetter}${surnameLetter}`
    : nameLetter;

  const username = isFullName ? `${name} ${surname}` : name;

  const onAddPublicationBtnClick = () => {
    navigate(isAuthorized ? ROUTES.ADD_PUBLICATION : ROUTES.LOGIN);
  };

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

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
    <AntDrawer
      className={styles.headerDrawer}
      closeIcon={null}
      open={open}
      placement="left"
      width="100%"
      extra={<CloseIcon onClick={onClose} className={styles.drawerCloseBtn} />}
      title={<Logo />}
      style={{
        backgroundColor: theme.primary,
      }}
    >
      {isAuthorized && (
        <Row className={styles.userSection} align="middle" justify="center">
          <Col span={24}>
            <ConfigProvider theme={localThemeDropdown}>
              <Dropdown
                menu={menu}
                placement="bottom"
                trigger={['click']}
                rootClassName={styles.dropdownRoot}
              >
                <div className={styles.avatarSection}>
                  <Avatar size="large" className={styles.avatarLarge}>
                    {usernameABBR}
                  </Avatar>
                  <span className={styles.userSectionUsername}>{username}</span>
                </div>
              </Dropdown>
            </ConfigProvider>
          </Col>
        </Row>
      )}
      {!isAuthorized && (
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
                onClick={onAddPublicationBtnClick}
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
            {TEXT.CHOOSE_LOCATION}
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
      controlItemBgHover: theme.N3,
      controlPaddingHorizontal: 16,
      borderRadiusLG: 16,
      paddingBlock: 9,
      colorText: theme.N1,
      colorBgElevated: theme.primary,
    },
  },
};
