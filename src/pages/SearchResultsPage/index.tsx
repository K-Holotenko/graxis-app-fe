import { useEffect } from 'react';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { SearchLayout } from 'src/layouts/SearchLayout';

import { PublicationsSection } from './children/PublicationsSection';
import { SEARCH_RESULTS_CONFIG } from './utils/config';
import { TopContent } from './children/TopContent';

export const SearchResultsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer pageTitle={SEARCH_RESULTS_CONFIG.PAGE_TITLE}>
      <AppLayout>
        <SearchLayout
          topContent={<TopContent />}
          centerContent={<PublicationsSection />}
          bottomContent={undefined}
        />
      </AppLayout>
    </PageContainer>
  );
};
