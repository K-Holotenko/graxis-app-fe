import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ItemLayout } from 'src/layouts/ItemLayout';
import { UserDescription } from 'src/pages/ItemPage/children/UserDescription';
import { ItemName } from 'src/pages/ItemPage/children/ItemName';
import { Price } from 'src/pages/ItemPage/children/Price';
import { MOCKED_PRICES, SCREEN_WIDTH, TEXT } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

import { ITEM_PAGE_CONFIG } from './utils/config';

const mockedProductData = {
  title: TEXT.PRODUCT_NAME,
  category: TEXT.PRODUCT_CATEGORY,
  rating: '4,5',
  feedbackCount: 12,
};

export const ItemPage = () => {
  const { width } = useWindowSize();
  const isMobileOrTablet = width <= SCREEN_WIDTH.XL;

  return (
    <PageContainer pageTitle={ITEM_PAGE_CONFIG.PAGE_TITLE}>
      <AppLayout>
        <ItemLayout
          leftContent={
            <>
              {isMobileOrTablet && <ItemName productData={mockedProductData} />}
              <UserDescription />
            </>
          }
          rightContent={
            <>
              {!isMobileOrTablet && (
                <ItemName productData={mockedProductData} />
              )}
              <Price prices={MOCKED_PRICES} />
            </>
          }
          bottomContent={undefined}
        />
      </AppLayout>
    </PageContainer>
  );
};
