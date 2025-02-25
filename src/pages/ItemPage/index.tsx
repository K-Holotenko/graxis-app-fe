import { Col, Row } from 'antd';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ItemLayout } from 'src/layouts/ItemLayout';
import { UserDescription } from 'src/pages/ItemPage/children/UserDescription';
import { ItemName } from 'src/pages/ItemPage/children/ItemName';
import { Price } from 'src/pages/ItemPage/children/Price';
import { MOCKED_PRICES, SCREEN_WIDTH, TEXT } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

import { ITEM_PAGE_CONFIG } from './utils/config';
import { ImageCarousel } from './children/ImageCarousel';
import { LocationMap } from './children/LocationMap';

const mockedProductData = {
  title: TEXT.PRODUCT_NAME,
  category: TEXT.PRODUCT_CATEGORY,
  rating: '4,5',
  feedbackCount: 12,
};

const mockedLocationData = {
  name: TEXT.LOCATION_NAME_MAP,
  coordinates: { lat: 50.4501, lng: 30.5234 },
};

export const ItemPage = () => {
  const { width } = useWindowSize();
  const isMobileOrTablet = width <= SCREEN_WIDTH.XL;

  return (
    <PageContainer pageTitle={ITEM_PAGE_CONFIG.PAGE_TITLE}>
      <AppLayout>
        <ItemLayout
          leftContent={
            <Row gutter={[0, { xs: 32, sm: 32, md: 55, xl: 40 }]}>
              <Col span={24}>
                <ImageCarousel />
              </Col>
              {isMobileOrTablet && (
                <Col span={24}>
                  <ItemName productData={mockedProductData} />
                </Col>
              )}
              <Col span={24}>
                <UserDescription />
              </Col>
            </Row>
          }
          rightContent={
            <Row>
              {!isMobileOrTablet && (
                <Col span={24}>
                  <ItemName productData={mockedProductData} />
                </Col>
              )}
              <Col span={24}>
                <Price prices={MOCKED_PRICES} />
              </Col>
            </Row>
          }
          bottomContent={
            <Row>
              <Col span={24}>
                <LocationMap
                  locationName={mockedLocationData.name}
                  coordinates={mockedLocationData.coordinates}
                />
              </Col>
            </Row>
          }
        />
      </AppLayout>
    </PageContainer>
  );
};
