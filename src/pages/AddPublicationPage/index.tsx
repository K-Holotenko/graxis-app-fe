import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { AddPublication } from 'src/pages/AddPublicationPage/children/AddPublication';

import { ADD_PUBLICATION_PAGE_CONFIG } from './utils/config';

export const AddPublicationPage = () => (
  <PageContainer pageTitle={ADD_PUBLICATION_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <AddPublication />
    </AppLayout>
  </PageContainer>
);
