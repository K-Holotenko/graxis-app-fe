import { useEffect, useState } from 'react';

import { VALIDATION_MESSAGE } from 'src/config/validation';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { CardsGridLayout } from 'src/layouts/CardsGridLayout';
import { PopularGoodCard } from 'src/pages/HomePage/children/PopularGoodCard';
import { getAllPublications } from 'src/services/PublicationService';

export interface ProductData {
  id: string;
  thumbnailUrl: string;
  title: string;
  prices: { price: number; pricingPeriod: string }[];
}

export const PublicationsSection = () => {
  const [publications, setPublications] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();

  useEffect(() => {
    const fetchGoods = async () => {
      setLoading(true);
      try {
        const data = await getAllPublications();

        //TODO Remove and implement through the server
        setPublications(data.slice(0, 16));
      } catch {
        openNotification(
          NotificationType.ERROR,
          VALIDATION_MESSAGE.ERROR,
          VALIDATION_MESSAGE.TRY_AGAIN
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGoods();
  }, []);

  //TODO Remove this loading when the button Load more is added
  if (loading) <div>Loading...</div>;

  return (
    <CardsGridLayout>
      {publications.map((publication) => (
        <PopularGoodCard
          id={publication.id}
          key={publication.id}
          image={publication.thumbnailUrl}
          name={publication.title}
          rating={4.8}
          prices={publication.prices}
        />
      ))}
    </CardsGridLayout>
  );
};
