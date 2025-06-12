import { Alert, Col, Row } from 'antd';

import { AppLayout } from 'src/layouts/AppLayout';
import { PageContainer } from 'src/layouts/PageContainer';

import styles from './styles.module.scss';

interface PublicProfileLayoutProps {
  heroBanner: React.ReactNode;
  publications: React.ReactNode;
  feedbacks: React.ReactNode;
}

export const PublicProfileLayout = ({
  heroBanner,
  publications,
  feedbacks,
}: PublicProfileLayoutProps) => (
  <PageContainer pageTitle="Профіль">
    <AppLayout>
      <Row style={{ marginBottom: '20px' }}>
        <Col xs={{ span: 24 }} sm={{ span: 16, offset: 4 }}>
          <Alert
            message={
              <span>
                Ця сторінка є повністю статичною. Всі дані замокані. Очікує на
                реалізацію бекенду{' '}
                <a href="https://graxis-web.atlassian.net/browse/GRX-399">
                  GRX-399
                </a>
                ,{' '}
                <a href="https://graxis-web.atlassian.net/browse/GRX-398">
                  GRX-398
                </a>
              </span>
            }
            type="warning"
            showIcon
          />
        </Col>
      </Row>
      <Row className={styles.container}>
        <Col span={24}>{heroBanner}</Col>
      </Row>
      <Row className={styles.container}>
        <Col span={24}>{publications}</Col>
      </Row>
      <Row className={styles.container}>
        <Col sm={{ span: 24 }} md={{ span: 16, offset: 4 }}>
          {feedbacks}
        </Col>
      </Row>
    </AppLayout>
  </PageContainer>
);
