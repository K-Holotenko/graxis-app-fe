import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import { AppHeader } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
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
          <main className={styles.mainContainer}>{children}</main>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  );
};
