import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import { AppHeader } from 'src/components/logic/AppHeader';
import { AppFooter } from 'src/components/logic/AppFooter';
import { MainContainer } from 'src/components/ui/MainContainer';

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
