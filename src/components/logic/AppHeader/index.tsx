import { useEffect, useState } from 'react';
import { Row, Col, Avatar, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { SelectLocationBlock } from 'src/components/logic/SelectLocationBlock';
import { Logo } from 'src/components/ui/Logo';
import { useAuthStore } from 'src/stores/authStore';
import { ReactComponent as DrawerIcon } from 'src/assets/icons/drawer-icon.svg';
import { HEADER_MOBILE_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { AddPublicationButton } from 'src/components/ui/AddPublicationButton';
import { SignInButton } from 'src/components/ui/SignInButton';
import { NotificationBadge } from 'src/components/logic/NotificationBadge';
import { ROUTES } from 'src/router/routes';

import { AppHeaderDrawer } from './AppHeaderDrawer';
import { AvatarMenu } from './AvatarMenu';
import styles from './styles.module.scss';

export const AppHeader = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const { isAuthorized } = useAuthStore();
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
                <SelectLocationBlock />
              </Col>
            )}
          </Row>
          <Row gutter={30} align="middle">
            {isAuthorized && (
              <Col>
                <NotificationBadge />
              </Col>
            )}
            {isDesktop && shouldShowAddPublicationButton && (
              <Col>
                <AddPublicationButton
                  onClick={onAddPublicationBtnClick}
                  className={styles.publicationButton}
                />
              </Col>
            )}
            {!isAuthorized && isDesktop && (
              <Col>
                <SignInButton onClick={() => navigate(ROUTES.LOGIN)} />
              </Col>
            )}
            {isAuthorized && isDesktop && (
              <Col>
                <div className={styles.dropdownMenu}>
                  <Dropdown
                    overlay={<AvatarMenu />}
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
        <AppHeaderDrawer
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
        />
      )}
    </>
  );
};
