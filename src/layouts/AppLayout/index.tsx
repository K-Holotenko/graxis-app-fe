import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import { AppHeader } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AppLayout = ({ children, className }: AppLayoutProps) => {
  const isAddPublicationPage =
    window.location.pathname === ROUTES.ADD_PUBLICATION;

  return (
    <div>
      <Row>
        <Col span={24}>
          <AppHeader />
        </Col>
      </Row>
      <Row
        justify="center"
        className={`${isAddPublicationPage ? styles.greyBackground : ''}${className}`}
      >
        <Col span={24}>
          <main className={`${styles.mainContainer} ${className}`}>
            {children}
          </main>
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
