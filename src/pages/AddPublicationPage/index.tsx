import { PageContainer } from 'src/components/ui/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { AddPublication } from 'src/components/logic/AddPublication';

import { ADD_PUBLICATION_PAGE_CONFIG } from './utils/config';

export const AddPublicationPage = () => (
  <PageContainer pageTitle={ADD_PUBLICATION_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <AddPublication />
    </AppLayout>
  </PageContainer>
);
