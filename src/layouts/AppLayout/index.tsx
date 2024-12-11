import { Col, Row } from 'antd';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { AppHeader } from 'src/components/logic/AppHeader';
import { AppFooter } from 'src/components/logic/AppFooter';
import { MainContainer } from 'src/components/ui/MainContainer';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <Row>
        <Col span={24}>
          <AppHeader />
        </Col>
      </Row>
      <Row
        className={
          location.pathname === ROUTES.LISTING_PAGE ? styles.greyBackground : ''
        }
      >
        <Col span={24}>
          <MainContainer>{children}</MainContainer>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AppFooter />
        </Col>
      </Row>
    </div>
  );
};
