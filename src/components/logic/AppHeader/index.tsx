import { useState } from 'react';
import { Row, Col, Avatar } from 'antd';

import { SelectLocationBlock } from 'components/logic/SelectLocationBlock';
import { Logo } from 'components/ui/Logo';
import { useAuthStore } from 'stores/authStore';
import { ReactComponent as DrawerIcon } from 'assets/icons/drawer-icon.svg';
import { HEADER_MOBILE_WIDTH } from 'config/constants';
import { theme } from 'config/theme';
import { useWindowSize } from 'hooks/useWindowSize';
import { NotificationBadge } from '../NotificationBadge';
import { AppHeaderDrawer } from './AppHeaderDrawer';
import { AddAdvertisementButton } from 'components/ui/AddAdvertisementButton';
import { SignInButton } from 'components/ui/SignInButton';

import './styles.scss';

export const AppHeader = () => {
  const { width } = useWindowSize();

  const { isAuthorized } = useAuthStore();
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <section className="app-header-section">
        <div className="container">
          <Row className="app-header" justify={'space-between'}>
            <Row gutter={16} align="middle">
              {width <= HEADER_MOBILE_WIDTH && (
                <Col>
                  <DrawerIcon onClick={() => setShowDrawer(true)} />
                </Col>
              )}

              <Col>
                <Logo />
              </Col>

              {width > HEADER_MOBILE_WIDTH && (
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

              {width > HEADER_MOBILE_WIDTH && (
                <Col>
                  <AddAdvertisementButton onClick={() => {}} />
                </Col>
              )}

              {!isAuthorized && width > HEADER_MOBILE_WIDTH && (
                <Col>
                  <SignInButton onClick={() => {}} />
                </Col>
              )}

              {isAuthorized && width > HEADER_MOBILE_WIDTH && (
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
