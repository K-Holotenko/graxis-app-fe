import { ReactNode } from 'react';
import { Col, Row } from 'antd';

import { Header } from 'components/logic/Header';
import { Footer } from 'components/logic/Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="app-layout">
    <Row>
      <Col span={24}>
        <Header />
      </Col>
    </Row>
    <Row>
      <Col span={24}>{children}</Col>
    </Row>
    <Row>
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  </div>
);
