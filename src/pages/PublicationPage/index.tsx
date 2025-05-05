import { Col, Row, Skeleton } from 'antd';

import { usePublication } from 'src/hooks/usePublication';
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
import { Loadable } from 'src/components/Loadable';
import { useCategories } from 'src/hooks/useCategories';
import { Publication } from 'src/services/PublicationService';
import { useUserStore } from 'src/stores/userStore';

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
  const { categoriesTree } = useCategories();
  const { user } = useUserStore();

  const { publication, isPublicationLoading, isEditable } = usePublication();

  const isMobileOrTablet = width <= SCREEN_WIDTH.XL;
  const isMobile = width < SCREEN_WIDTH.SM;

  const currentCategory = publication?.category;

  const breadcrumbItems =
    categoriesTree.length && currentCategory
      ? generateBreadcrumbs({
          breadcrumbs: categoriesTree,
          currentBreadcrumb: currentCategory,
          showAllItems: true,
        })
      : null;

  const isOwner =
    publication && user ? user.id === publication.ownerInfo.id : false;

  return (
    <PageContainer pageTitle="Публікація">
      <AppLayout>
        <PublicationLayout
          breadcrumbs={
            <Loadable
              isLoading={isPublicationLoading}
              skeleton={
                <BreadcrumbsSkeleton isLoading={isPublicationLoading} />
              }
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
                  isLoading={isPublicationLoading}
                  skeleton={<CarouselSkeleton />}
                  component={() => (
                    <ImageCarousel pictures={publication!.pictures} />
                  )}
                />
              </Col>
              {isMobileOrTablet && (
                <Col span={24}>
                  <Loadable
                    isLoading={isPublicationLoading}
                    skeleton={<Skeleton.Input active />}
                    component={() => (
                      <PublicationName
                        isEditable={isEditable}
                        id={publication!.id}
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
                  isLoading={isPublicationLoading}
                  skeleton={
                    <DescriptionSkeleton isLoading={isPublicationLoading} />
                  }
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
                    isLoading={isPublicationLoading}
                    skeleton={
                      <PublicationNameSkeleton
                        isLoading={isPublicationLoading}
                      />
                    }
                    component={() => (
                      <PublicationName
                        isEditable={isEditable}
                        id={publication!.id}
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
                  isLoading={isPublicationLoading}
                  skeleton={<PriceSkeleton />}
                  component={() => (
                    <Price
                      prices={publication!.price}
                      isOwner={isOwner}
                      bookedDates={publication?.bookedDates || []}
                    />
                  )}
                />
              </Col>
            </Row>
          }
          map={
            <Loadable
              isLoading={isPublicationLoading}
              skeleton={<MapSkeleton />}
              component={() => (
                <Map
                  location={publication!.location as Publication['location']}
                />
              )}
            />
          }
        />
      </AppLayout>
    </PageContainer>
  );
};
