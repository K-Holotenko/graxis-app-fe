import { CardsGridLayout } from 'src/layouts/CardsGridLayout';
import { PublicationCard } from 'src/components/PublicationCard';
import { SearchEmptyState } from 'src/pages/SearchPage/children/SearchEmptyState/index';
import { PublicationCard as PublicationCardType } from 'src/services/PublicationService';
import { PublicationsGridSkeleton } from 'src/pages/SearchPage/skeletons';

interface PublicationsSectionProps {
  publications: PublicationCardType[];
  isLoading: boolean;
}

export const PublicationsSection = ({
  publications,
  isLoading,
}: PublicationsSectionProps) => {
  const isNoResults = publications.length === 0 && !isLoading;
  const areSomePublicationsLoaded = publications.length > 0;
  const skeletonsCount = areSomePublicationsLoaded ? 10 : 20;
  const addMarginIfNextPageLoading = isLoading && areSomePublicationsLoaded;

  return isNoResults ? (
    <SearchEmptyState />
  ) : (
    <>
      <CardsGridLayout>
        {publications.map((publication) => (
          <PublicationCard publicationCard={publication} key={publication.id} />
        ))}
      </CardsGridLayout>
      <div style={addMarginIfNextPageLoading ? { marginTop: 24 } : undefined}>
        {isLoading && (
          <PublicationsGridSkeleton numberOfCards={skeletonsCount} />
        )}
      </div>
    </>
  );
};
