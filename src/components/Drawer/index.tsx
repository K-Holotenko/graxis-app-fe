import { useState } from 'react';
import {
  Col,
  ConfigProvider,
  Drawer as AntDrawer,
  Row,
  Typography,
  Dropdown,
  Avatar,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { ReactComponent as Logo } from 'src/assets/icons/logo-light.svg';
import { ReactComponent as PlusIconDark } from 'src/assets/icons/plus-icon-dark.svg';
import { ReactComponent as UserIconDark } from 'src/assets/icons/user-icon-dark.svg';
import { theme } from 'src/config/theme';
import { useAuthStore } from 'src/stores/authStore';
import { SelectLocation } from 'src/components/SelectLocation';
import { ButtonTypes, TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';
import { Menu } from 'src/components/Menu';
import { Button } from 'src/components/Button';

import styles from './styles.module.scss';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export const Drawer = ({ open, onClose }: DrawerProps) => {
  const { isAuthorized } = useAuthStore();
  const navigate = useNavigate();
  const shouldShowAddPublicationButton =
    window.location.pathname !== ROUTES.ADD_PUBLICATION;

  const [usernameABBR] = useState('BC'); // should be implemented using store and real name
  const [username] = useState('Вадим Семко'); // should be implemented using store and real name

  const onAddPublicationBtnClick = () => {
    navigate(isAuthorized ? ROUTES.ADD_PUBLICATION : ROUTES.LOGIN);
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
      style={{ backgroundColor: theme.primaryColor }}
    >
      {isAuthorized && (
        <Row className={styles.userSection} align="middle" justify="center">
          <Col span={24}>
            <Dropdown overlay={<Menu />} placement="bottom" trigger={['click']}>
              <div className={styles.avatarSection}>
                <Avatar size="large" className={styles.avatarLarge}>
                  {usernameABBR}
                </Avatar>
                <span className={styles.userSectionUsername}>{username}</span>
              </div>
            </Dropdown>
          </Col>
        </Row>
      )}
      {!isAuthorized && (
        <Row>
          <Col span={24}>
            <ConfigProvider theme={localTheme}>
              <Button
                type={ButtonTypes.default}
                icon={<UserIconDark />}
                iconPosition="start"
                onClick={() => navigate(ROUTES.LOGIN)}
                label={TEXT.AUTHORIZE}
              />
            </ConfigProvider>
          </Col>
        </Row>
      )}
      {shouldShowAddPublicationButton && (
        <Row className={styles.verticalPadding}>
          <Col span={24}>
            <Button
              type={ButtonTypes.primary}
              icon={<PlusIconDark />}
              iconPosition="end"
              className={styles.addPublicationButton}
              onClick={onAddPublicationBtnClick}
              dataTestId="add-publication-btn"
              label={TEXT.ADD_PUBLICATION}
            />
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

const localTheme = {
  components: {
    Button: {
      colorPrimary: theme.lightGreenColor,
      colorText: theme.lightGreenColor,
      colorBgContainer: theme.primaryColor,
      colorBorder: theme.lightGreenColor,
    },
  },
};
