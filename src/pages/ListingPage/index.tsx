import { AddListing } from 'src/components/logic/AddListing';
import { PageContainer } from 'src/components/ui/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { LISTING_PAGE_CONFIG } from 'src/pages/ListingPage/utils/config';

export const ListingPage = () => (
  <PageContainer pageTitle={LISTING_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <AddListing />
    </AppLayout>
  </PageContainer>
);
