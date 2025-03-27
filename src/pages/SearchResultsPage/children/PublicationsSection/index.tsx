import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { VALIDATION_MESSAGE } from 'src/config/validation';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { CardsGridLayout } from 'src/layouts/CardsGridLayout';
import { PopularGoodCard } from 'src/pages/HomePage/children/PopularGoodCard';
import { getAllPublications } from 'src/services/PublicationService';
import { SearchEmptyState } from 'src/pages/SearchResultsPage/children/SearchEmptyState/index';

export interface ProductData {
  id: string;
  thumbnailUrl: string;
  title: string;
  price: { price: number; pricingPeriod: string };
}

export const PublicationsSection = () => {
  const [publications, setPublications] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification } = useNotification();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchGoods = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPublications(searchParams);

        setPublications(data);
      } catch {
        openNotification(
          NotificationType.ERROR,
          VALIDATION_MESSAGE.ERROR,
          VALIDATION_MESSAGE.TRY_AGAIN
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoods();
  }, [searchParams]);

  //TODO Remove this loading when the button Load more is added
  if (isLoading) return <div>Loading...</div>;

  const isNoResults = publications.length && !isLoading;

  return isNoResults ? (
    <CardsGridLayout>
      {publications.map((publication) => (
        <PopularGoodCard
          id={publication.id}
          key={publication.id}
          image={publication.thumbnailUrl}
          name={publication.title}
          rating={4.8}
          price={publication.price}
        />
      ))}
    </CardsGridLayout>
  ) : (
    <SearchEmptyState />
  );
};
