import { Col, Row } from 'antd';
import { ReactNode } from 'react';

<<<<<<< HEAD
import { AppHeader } from 'components/logic/AppHeader';
import { AppFooter } from 'components/logic/AppFooter';
=======
import { Footer } from 'src/components/logic/Footer';
import { Header } from 'src/components/logic/Header';
>>>>>>> 1b3ba16 (GRX-135 Set up import to support absolute path and follow the order)

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="app-layout">
    <Row>
      <Col span={24}>
        <AppHeader />
      </Col>
    </Row>
    <Row>
      <Col span={24}>{children}</Col>
    </Row>
    <Row>
      <Col span={24}>
        <AppFooter />
      </Col>
    </Row>
  </div>
);
