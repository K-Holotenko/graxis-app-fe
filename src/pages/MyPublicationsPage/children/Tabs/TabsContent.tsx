import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PublicationCard } from 'src/components/PublicationCard';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { CardsGridLayout } from 'src/layouts/CardsGridLayout';
import { PublicationsGridSkeleton } from 'src/pages/SearchPage/skeletons';
import { PublicationCard as PublicationCardType } from 'src/services/PublicationService';
import {
  PublicationFilters,
  useMyPublicationStore,
} from 'src/stores/myPublicationStore';
import {
  MyPublicationsEmptyState,
  statusToEmptyStatePropsMap,
} from 'src/pages/MyPublicationsPage/children/MyPublicationsEmptyState';

export const TabsContent = () => {
  const { openNotification } = useNotification();
  const {
    isLoading,
    listedPublications,
    rentedOutPublications,
    rentingPublications,
    getAllMyPublications,
  } = useMyPublicationStore();

  const { tab } = useParams<{ tab: PublicationFilters }>();

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  useEffect(() => {
    getAllMyPublications(tab!, showError);
  }, []);

  const statusToPublications: Partial<
    Record<PublicationFilters, PublicationCardType[]>
  > = {
    [PublicationFilters.LISTED]: listedPublications,
    [PublicationFilters.RENTED_OUT]: rentedOutPublications,
    [PublicationFilters.RENTING]: rentingPublications,
  };

  const publications = statusToPublications[tab!];

  if (isLoading && !publications?.length) {
    return <MyPublicationsEmptyState {...statusToEmptyStatePropsMap[tab!]!} />;
  }

  return !isLoading ? (
    <CardsGridLayout>
      {publications?.map((publication) => (
        <PublicationCard
          key={publication.id}
          publicationCard={publication}
          isEditable={
            tab === PublicationFilters.LISTED ||
            tab === PublicationFilters.RENTED_OUT
          }
        />
      ))}
    </CardsGridLayout>
  ) : (
    <PublicationsGridSkeleton numberOfCards={8} />
  );
};
