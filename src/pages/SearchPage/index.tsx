import { ConfigProvider, Pagination } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { VALIDATION_MESSAGE } from 'src/config/validation';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { SearchLayout } from 'src/layouts/SearchLayout';
import { getAllPublications } from 'src/services/PublicationService';
import { theme } from 'src/config/theme';
import { PublicationPage } from 'src/types';

import { PublicationsSection } from './children/PublicationsSection';
import { SEARCH_RESULTS_CONFIG } from './utils/config';
import { Filters } from './children/Filters';
import { LoadMore } from './children/LoadMore';

export const SearchPage = () => {
  const [publicationsPage, setPublicationsPage] = useState<PublicationPage>({
    publications: [],
    nextPage: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  const [searchParams, setSearchParams] = useSearchParams();
  const { openNotification } = useNotification();

  // Flag to prevent useEffect from triggering when we manually handle the fetch
  const skipFetchPublicationsRef = useRef(false);

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

    // Skip the next fetchPublications in useEffect since we're handling the fetch manually
    skipFetchPublicationsRef.current = true;
    setSearchParams(newSearchParams);

    fetchPublications(newSearchParams, (nextPagePublications) => {
      setPublicationsPage((prev) => {
        setTotalPages(
          nextPagePublications.total - currentPage * prev.publications.length
        );

        return {
          publications: [
            ...prev.publications,
            ...nextPagePublications.publications,
          ],
          nextPage: nextPagePublications.nextPage,
          total: nextPagePublications.total,
        };
      });
    });
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('page', String(page));

    const title = searchParams.get('title');
    const city = searchParams.get('city');
    const categories = searchParams.get('categories');

    title && newSearchParams.set('title', title);
    city && newSearchParams.set('city', city);
    categories && newSearchParams.set('categories', categories);

    // Skip the next fetchPublications in useEffect since we're handling the fetch manually
    skipFetchPublicationsRef.current = true;
    setSearchParams(newSearchParams);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTotalPages(undefined);
    fetchPublications(newSearchParams, (data) => {
      setPublicationsPage(data);
    });
  };

  useEffect(() => {
    // If we've set the skip flag, reset it and don't trigger the fetch
    if (skipFetchPublicationsRef.current) {
      skipFetchPublicationsRef.current = false;

      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);

    setTotalPages(undefined);

    fetchPublications(newSearchParams, (data) => {
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
          pagination={
            !isLoading && (
              <ConfigProvider theme={localTheme}>
                <Pagination
                  size="default"
                  align="center"
                  current={Number(searchParams.get('page')) || 1}
                  pageSize={20}
                  total={totalPages || publicationsPage.total}
                  onChange={handlePageChange}
                />
              </ConfigProvider>
            )
          }
        />
      </AppLayout>
    </PageContainer>
  );
};

const localTheme = {
  token: {
    colorPrimary: theme.primary,
    colorBgTextActive: theme.N3,
    colorBgTextHover: theme.N2,
  },
};
