import { ConfigProvider, Pagination } from 'antd';
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
import { theme } from 'src/config/theme';

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

  const [searchParams, setSearchParams] = useSearchParams();
  const { openNotification } = useNotification();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );

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
    const nextPage = currentPage + 1;

    newSearchParams.set('page', String(nextPage));
    setCurrentPage(nextPage);

    fetchPublications(newSearchParams, (nextPagePublications) => {
      setPublicationsPage((prev) => ({
        publications: [
          ...prev.publications,
          ...nextPagePublications.publications,
        ],
        nextPage: nextPagePublications.nextPage,
        total: nextPagePublications.total,
      }));
    });
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('page', String(page));

    title && newSearchParams.set('title', title);
    city && newSearchParams.set('city', city);
    categories && newSearchParams.set('categories', categories);

    setSearchParams(newSearchParams);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const title = searchParams.get('title');
  const city = searchParams.get('city');
  const categories = searchParams.get('categories');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    setSearchParams(params, { replace: true });
    setCurrentPage(1);
    fetchPublications(params, (data) => {
      setPublicationsPage(data);
    });
  }, [title, city, categories]);

  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;

    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
      const params = new URLSearchParams(searchParams);

      params.set('page', String(urlPage));
      fetchPublications(params, (data) => setPublicationsPage(data));
    }
  }, [searchParams.get('page')]);

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
                  current={currentPage}
                  pageSize={16}
                  total={publicationsPage.total}
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
