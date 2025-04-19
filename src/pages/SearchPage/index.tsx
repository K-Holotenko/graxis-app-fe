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

export const SearchPage = () => {
  const [publicationsPage, setPublicationsPage] = useState<PublicationPage>({
    publications: [],
    nextPage: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const { openNotification } = useNotification();

  const fetchPublications = (
    params: URLSearchParams,
    onSuccess: (data: PublicationPage) => void
  ) => {
    setIsLoading(true);

    getAllPublications('?' + params.toString())
      .then((data) => {
        onSuccess(data);
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

  const loadMode = async () => {
    if (!publicationsPage.nextPage) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    const currentPage = Number(newSearchParams.get('page') || '1');
    const nextPage = currentPage + 1;

    newSearchParams.set('page', String(nextPage));
    setSearchParams(newSearchParams);

    fetchPublications(newSearchParams, (nextPagePublications) => {
      setPublicationsPage((prev) => ({
        publications: [
          ...prev.publications,
          ...nextPagePublications.publications,
        ],
        nextPage: nextPagePublications.nextPage,
      }));
    });
  };

  useEffect(() => {
    fetchPublications(searchParams, (data) => {
      setPublicationsPage(data);
    });
  }, [searchParams]);

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
