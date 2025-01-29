import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';

import { ITEM_PAGE_CONFIG } from './utils/config';

import { ItemLayout } from 'src/layouts/ItemLayout';

export const ItemPage = () => (
  <PageContainer pageTitle={ITEM_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <ItemLayout
        leftContent={undefined}
        rightContent={undefined}
        bottomContent={undefined}
      />
    </AppLayout>
  </PageContainer>
);
