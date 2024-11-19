import { ReactNode } from 'react';
import { Col, Row } from 'antd';

import { AppHeader } from 'components/logic/AppHeader';
import { AppFooter } from 'components/logic/AppFooter';

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
