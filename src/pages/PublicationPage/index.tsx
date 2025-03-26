import { Col, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { PublicationLayout } from 'src/layouts/PublicationLayout';
import { Description } from 'src/pages/PublicationPage/children/Description';
import { PublicationName } from 'src/pages/PublicationPage/children/PublicationName';
import { Price } from 'src/pages/PublicationPage/children/Price';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { generateBreadcrumbs } from 'src/components/BreadCrumbs/utils/generateBreadcrumbs';
import { Breadcrumbs } from 'src/components/BreadCrumbs';
import { CATEGORIES_DROP_DATA } from 'src/pages/AddPublicationPage/children/CategoriesDropdown/utils/config';
import {
  getPublicationById,
  Publication,
} from 'src/services/PublicationService';
import { Loadable } from 'src/components/Loadable';

import { ImageCarousel } from './children/ImageCarousel';
import { Owner } from './children/Owner';
import { Map } from './children/Map';
import {
  BreadcrumbsSkeleton,
  CarouselSkeleton,
  DescriptionSkeleton,
  MapSkeleton,
  PriceSkeleton,
  PublicationNameSkeleton,
} from './skeletons';

export const PublicationPage = () => {
  const { width } = useWindowSize();
  const params = useParams();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isMobileOrTablet = width <= SCREEN_WIDTH.XL;
  const isMobile = width < SCREEN_WIDTH.SM;

  const breadcrumbItems = generateBreadcrumbs({
    items: CATEGORIES_DROP_DATA,
    currentItem: 'gamingConsoles',
    showAllItems: true,
  });

  useEffect(() => {
    if (params.id === undefined) {
      // TODO add redirect to 404 page
      // navigate(ROUTES.NOT_FOUND);
      return;
    }

    const fetchPublicationById = async () => {
      try {
        const fetchedPublication: Publication = await getPublicationById(
          params.id || ''
        );

        setPublication(fetchedPublication);
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setHasError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicationById();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!publication && hasError) {
    return <div>Error occurred. There is no page here</div>;
  }

  return (
    <PageContainer pageTitle="Публікація">
      <AppLayout>
        <PublicationLayout
          breadcrumbs={
            <Loadable
              isLoading={isLoading}
              skeleton={<BreadcrumbsSkeleton isLoading={isLoading} />}
              component={() => (
                <Breadcrumbs
                  breadcrumbItems={breadcrumbItems}
                  isMobile={isMobile}
                />
              )}
            />
          }
          main={
            <Row gutter={[0, { xs: 32, sm: 32, md: 55, xl: 40 }]}>
              <Col span={24}>
                <Loadable
                  isLoading={isLoading}
                  skeleton={<CarouselSkeleton />}
                  component={() => (
                    <ImageCarousel pictures={publication!.pictures} />
                  )}
                />
              </Col>
              {isMobileOrTablet && (
                <Col span={24}>
                  <Loadable
                    isLoading={isLoading}
                    skeleton={<Skeleton.Input active />}
                    component={() => (
                      <PublicationName
                        title={publication!.title}
                        category={publication!.category}
                        rate={publication!.rate}
                        feedbackCount={publication!.feedbackCount}
                      />
                    )}
                  />
                </Col>
              )}
              <Col span={24}>
                <Loadable
                  isLoading={isLoading}
                  skeleton={<DescriptionSkeleton isLoading={isLoading} />}
                  component={() => (
                    <>
                      <Description description={publication!.description} />
                      <Owner ownerInfo={publication!.ownerInfo} />
                    </>
                  )}
                />
              </Col>
            </Row>
          }
          sidebar={
            <Row>
              {!isMobileOrTablet && (
                <Col span={24}>
                  <Loadable
                    isLoading={isLoading}
                    skeleton={<PublicationNameSkeleton isLoading={isLoading} />}
                    component={() => (
                      <PublicationName
                        title={publication!.title}
                        category={publication!.category}
                        rate={publication!.rate}
                        feedbackCount={publication!.feedbackCount}
                      />
                    )}
                  />
                </Col>
              )}
              <Col span={24}>
                <Loadable
                  isLoading={isLoading}
                  skeleton={<PriceSkeleton />}
                  component={() => <Price prices={publication!.price} />}
                />
              </Col>
            </Row>
          }
          map={
            <Loadable
              isLoading={isLoading}
              skeleton={<MapSkeleton />}
              component={() => <Map location={publication!.location} />}
            />
          }
        />
      </AppLayout>
    </PageContainer>
  );
};
