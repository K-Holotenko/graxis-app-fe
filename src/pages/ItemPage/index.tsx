import { Col, Row } from 'antd';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ItemLayout } from 'src/layouts/ItemLayout';
import { UserDescription } from 'src/pages/ItemPage/children/UserDescription';

import { ITEM_PAGE_CONFIG } from './utils/config';
import { ImageCarousel } from './children/ImageCarousel';

export const ItemPage = () => (
  <PageContainer pageTitle={ITEM_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <ItemLayout
        leftContent={
          <Row gutter={[0, { xs: 32, sm: 32, md: 55, xl: 40 }]}>
            <Col span={24}>
              <ImageCarousel />
            </Col>
            <Col span={24}>
              <UserDescription />
            </Col>
          </Row>
        }
        rightContent={undefined}
        bottomContent={undefined}
      />
    </AppLayout>
  </PageContainer>
);
