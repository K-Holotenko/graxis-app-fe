import { Col, Row } from 'antd';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ItemLayout } from 'src/layouts/ItemLayout';
import { UserDescription } from 'src/pages/ItemPage/children/UserDescription';
import { ItemName } from 'src/pages/ItemPage/children/ItemName';
import { Price } from 'src/pages/ItemPage/children/Price';
import { MOCKED_PRICES, SCREEN_WIDTH, TEXT } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { generateBreadcrumbs } from 'src/components/BreadCrumbs/utils/generateBreadcrumbs';
import { Breadcrumbs } from 'src/components/BreadCrumbs';
import { CATEGORIES_DROP_DATA } from 'src/pages/AddPublicationPage/children/CategoriesDropdown/utils/config';

import { ITEM_PAGE_CONFIG } from './utils/config';
import { ImageCarousel } from './children/ImageCarousel';

const mockedProductData = {
  title: TEXT.PRODUCT_NAME,
  category: TEXT.PRODUCT_CATEGORY,
  rating: '4,5',
  feedbackCount: 12,
};

export const ItemPage = () => {
  const { width } = useWindowSize();
  const isMobileOrTablet = width <= SCREEN_WIDTH.XL;
  const isMobile = width < SCREEN_WIDTH.SM;

  const breadcrumbItems = generateBreadcrumbs({
    items: CATEGORIES_DROP_DATA,
    currentItem: 'gamingConsoles',
    showAllItems: true,
  });

  return (
    <PageContainer pageTitle={ITEM_PAGE_CONFIG.PAGE_TITLE}>
      <AppLayout>
        <Row>
          <Col span={24}>
            <Breadcrumbs
              breadcrumbItems={breadcrumbItems}
              isMobile={isMobile}
            />
          </Col>
        </Row>
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
          bottomContent={undefined}
        />
      </AppLayout>
    </PageContainer>
  );
};
