import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ItemLayout } from 'src/layouts/ItemLayout';
import styles from 'src/layouts/AppLayout/styles.module.scss';

import { ITEM_PAGE_CONFIG } from './utils/config';
import { ImageCarousel } from './children/ImageCarousel';

export const ItemPage = () => (
  <PageContainer pageTitle={ITEM_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout className={styles.noPadding}>
      <ItemLayout
        leftContent={<ImageCarousel />}
        rightContent={undefined}
        bottomContent={undefined}
      />
    </AppLayout>
  </PageContainer>
);
