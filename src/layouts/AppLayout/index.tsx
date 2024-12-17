import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import { AppHeader } from 'src/components/logic/AppHeader';
import { AppFooter } from 'src/components/logic/AppFooter';
import { MainContainer } from 'src/components/ui/MainContainer';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const isAddPublicationPage =
    window.location.pathname === ROUTES.ADD_PUBLICATION;

  return (
    <div className="app-layout">
      <Row>
        <Col span={24}>
          <AppHeader />
        </Col>
      </Row>
      <Row className={isAddPublicationPage ? styles.greyBackground : ''}>
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
