import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ItemLayout } from 'src/layouts/ItemLayout';
import { UserDescription } from 'src/pages/ItemPage/children/UserDescription';

import { ITEM_PAGE_CONFIG } from './utils/config';

export const ItemPage = () => (
  <PageContainer pageTitle={ITEM_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <ItemLayout
        leftContent={<UserDescription />}
        rightContent={undefined}
        bottomContent={undefined}
      />
    </AppLayout>
  </PageContainer>
);
