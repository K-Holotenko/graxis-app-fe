import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { SearchLayout } from 'src/layouts/SearchLayout';

import { SEARCH_RESULTS_CONFIG } from './utils/config';

export const SearchResultsPage = () => (
  <PageContainer pageTitle={SEARCH_RESULTS_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <SearchLayout
        topContent={undefined}
        centerContent={undefined}
        bottomContent={undefined}
      />
    </AppLayout>
  </PageContainer>
);
