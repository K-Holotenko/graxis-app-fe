import { useEffect, useState } from 'react';
import { Row, Col, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { SelectLocationBlock } from 'src/components/logic/SelectLocationBlock';
import { Logo } from 'src/components/ui/Logo';
import { useAuthStore } from 'src/stores/authStore';
import { ReactComponent as DrawerIcon } from 'src/assets/icons/drawer-icon.svg';
import { HEADER_MOBILE_WIDTH } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { AddAdvertisementButton } from 'src/components/ui/AddAdvertisementButton';
import { SignInButton } from 'src/components/ui/SignInButton';
import { NotificationBadge } from 'src/components/logic/NotificationBadge';
import { ROUTES } from 'src/router/routes';

import { AppHeaderDrawer } from './AppHeaderDrawer';

import './styles.scss';

export const AppHeader = () => {
  const { width } = useWindowSize();

  const { isAuthorized } = useAuthStore();
  const [showDrawer, setShowDrawer] = useState(false);
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    setDesktop(width > HEADER_MOBILE_WIDTH);
  }, [width]);

  return (
    <>
      <section className="app-header-section">
        <div className="container">
          <Row className="app-header" justify={'space-between'}>
            <Row gutter={16} align="middle">
              {!isDesktop && (
                <Col>
                  <DrawerIcon onClick={() => setShowDrawer(true)} />
                </Col>
              )}

              <Col>
                <Logo />
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

              {isDesktop && (
                <Col>
                  <Link to={isAuthorized ? ROUTES.ADD_LISTING : ROUTES.LOGIN}>
                    <AddAdvertisementButton onClick={() => {}} />
                  </Link>
                </Col>
              )}

              {!isAuthorized && isDesktop && (
                <Col>
                  <SignInButton onClick={() => {}} />
                </Col>
              )}

              {isAuthorized && isDesktop && (
                <Col>
                  {/* temporarily, dropdown should be added, firstName and lastName should be selected from the store  */}
                  <Avatar
                    style={{
                      backgroundColor: theme.success,
                      height: 48,
                      width: 48,
                    }}
                  >
                    BC
                  </Avatar>
                </Col>
              )}
            </Row>
          </Row>
        </div>
      </section>

      {showDrawer && (
        <AppHeaderDrawer
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
        />
      )}
    </>
  );
};
