import { useEffect, useState } from 'react';

import { VALIDATION_MESSAGE } from 'src/config/validation';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { CardsGridLayout } from 'src/layouts/CardsGridLayout';
import { PublicationCard } from 'src/components/PublicationCard';
import {
  getAllPublications,
  PublicationCard as PublicationCardType,
} from 'src/services/PublicationService';
import { SearchEmptyState } from 'src/pages/SearchResultsPage/children/SearchEmptyState/index';

export const PublicationsSection = () => {
  const [publications, setPublications] = useState<PublicationCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification } = useNotification();

  useEffect(() => {
    const fetchGoods = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPublications();

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
  }, []);

  //TODO Remove this loading when the button Load more is added
  if (isLoading) return <div>Loading...</div>;

  const isNoResults = publications.length && !isLoading;

  return isNoResults ? (
    <CardsGridLayout>
      {publications.map((publication) => (
        <PublicationCard publicationCard={publication} key={publication.id} />
      ))}
    </CardsGridLayout>
  ) : (
    <SearchEmptyState />
  );
};
