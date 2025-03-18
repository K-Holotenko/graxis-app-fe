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
  const [publication, setPublication] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const { openNotification } = useNotification();

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await getAllPublications();

        setPublication(data.slice(0, 16));
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
  }, [openNotification]);

  if (loading) {
    return <div>Loadig...</div>;
  }

  return (
    <CardsGridLayout>
      {publication.map((pub) => (
        <PopularGoodCard
          id={pub.id}
          key={pub.id}
          image={pub.thumbnailUrl}
          name={pub.title}
          rating={4.8}
          prices={pub.prices}
        />
      ))}
    </CardsGridLayout>
  );
};
