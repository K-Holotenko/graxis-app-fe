import { useEffect, useState } from 'react';
import { Row, Col, Avatar, Dropdown, Badge, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import notificationIconSrc from 'src/assets/icons/notification-icon.svg';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-icon.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user-icon.svg';
import { SelectLocation } from 'src/components/SelectLocation';
import { Logo } from 'src/components/Logo';
import { useAuthStore } from 'src/stores/authStore';
import { ReactComponent as DrawerIcon } from 'src/assets/icons/drawer-icon.svg';
import {
  HEADER_MOBILE_WIDTH,
  IMAGE_DESCRIPTION,
  ButtonTypes,
  TEXT,
} from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ROUTES } from 'src/router/routes';
import { Menu } from 'src/components/Menu/index';
import { Drawer } from 'src/components/Drawer';
import { Button } from 'src/components/Button';

import styles from './styles.module.scss';

export const AppHeader = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const { isAuthorized } = useAuthStore();
  const [hasNotifications] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isDesktop, setDesktop] = useState(false);
  const shouldShowAddPublicationButton =
    window.location.pathname !== ROUTES.ADD_PUBLICATION;

  useEffect(() => {
    setDesktop(width > HEADER_MOBILE_WIDTH);
  }, [width]);

  const onAddPublicationBtnClick = () => {
    navigate(isAuthorized ? ROUTES.ADD_PUBLICATION : ROUTES.LOGIN);
  };

  return (
    <>
      <header className={`container ${styles.headerContainer}`}>
        <Row className={styles.appHeader} justify={'space-between'}>
          <Row gutter={16} align="middle">
            {!isDesktop && (
              <Col>
                <DrawerIcon onClick={() => setShowDrawer(true)} />
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
          <Row gutter={30} align="middle">
            {isAuthorized && (
              <Col>
                <Badge dot={hasNotifications}>
                  <Image
                    src={notificationIconSrc}
                    alt={IMAGE_DESCRIPTION.LOGO}
                    preview={false}
                    className="notification-icon"
                  />
                </Badge>
              </Col>
            )}
            {isDesktop && shouldShowAddPublicationButton && (
              <Col>
                <Button
                  type={ButtonTypes.primary}
                  icon={<PlusIcon />}
                  iconPosition="end"
                  onClick={onAddPublicationBtnClick}
                  dataTestId="add-publication-btn"
                  label={TEXT.ADD_PUBLICATION}
                />
              </Col>
            )}
            {!isAuthorized && isDesktop && (
              <Col>
                <Button
                  type={ButtonTypes.default}
                  icon={<UserIcon />}
                  iconPosition="start"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  dataTestId="authorize-btn"
                  label={TEXT.AUTHORIZE}
                />
              </Col>
            )}
            {isAuthorized && isDesktop && (
              <Col>
                <div className={styles.dropdownMenu}>
                  <Dropdown
                    overlay={<Menu />}
                    placement="bottom"
                    trigger={['click']}
                  >
                    <Avatar size="large" className={styles.avatarLarge}>
                      BC
                    </Avatar>
                  </Dropdown>
                </div>
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
