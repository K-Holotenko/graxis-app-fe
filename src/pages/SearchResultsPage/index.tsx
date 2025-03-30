import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { VALIDATION_MESSAGE } from 'src/config/validation';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { SearchLayout } from 'src/layouts/SearchLayout';
import {
  getAllPublications,
  PublicationPage,
} from 'src/services/PublicationService';

import { PublicationsSection } from './children/PublicationsSection';
import { SEARCH_RESULTS_CONFIG } from './utils/config';
import { Filters } from './children/Filters';
import { LoadMore } from './children/LoadMore';

export const SearchResultsPage = () => {
  const [publicationsPage, setPublicationsPage] = useState<PublicationPage>({
    publications: [],
    nextPage: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification } = useNotification();
  const [searchParams] = useSearchParams();

  const loadMode = async () => {
    if (!publicationsPage.nextPage) {
      return;
    }

    setIsLoading(true);
    const queryString = searchParams.toString();

    getAllPublications(queryString, publicationsPage.nextPage)
      .then((nextPagePublications) => {
        setPublicationsPage((prev) => ({
          publications: [
            ...prev.publications,
            ...nextPagePublications.publications,
          ],
          nextPage: nextPagePublications.nextPage,
        }));
      })
      .catch(() => {
        openNotification(
          NotificationType.ERROR,
          VALIDATION_MESSAGE.ERROR,
          VALIDATION_MESSAGE.TRY_AGAIN
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const queryString = searchParams.toString();

    getAllPublications(queryString, 1)
      .then((data) => {
        setPublicationsPage(data);
      })
      .catch(() => {
        openNotification(
          NotificationType.ERROR,
          VALIDATION_MESSAGE.ERROR,
          VALIDATION_MESSAGE.TRY_AGAIN
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer pageTitle={SEARCH_RESULTS_CONFIG.PAGE_TITLE}>
      <AppLayout>
        <SearchLayout
          filters={<Filters />}
          publicationsGrids={
            <PublicationsSection
              publications={publicationsPage.publications}
              isLoading={isLoading}
            />
          }
          loadMoreButton={
            publicationsPage.nextPage && (
              <LoadMore loadMore={loadMode} isLoading={isLoading} />
            )
          }
        />
      </AppLayout>
    </PageContainer>
  );
};
