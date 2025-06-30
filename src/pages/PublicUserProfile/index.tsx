import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { HeroBanner } from 'src/pages/PublicUserProfile/children/HeroBanner';
import { CardsGridLayout } from 'src/layouts/CardsGridLayout';
import { PublicationCard } from 'src/components/PublicationCard';
import { PublicProfileLayout } from 'src/layouts/PublicProfileLayout';
import { useUserProfileStore } from 'src/stores/userProfileStore';

import styles from './styles.module.scss';
import { FeedbackCard } from './children/FeedbackCard';

export const PublicUserProfile = () => {
  const { profile, isLoading, getUserPublicProfile } = useUserProfileStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getUserPublicProfile(id);
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PublicProfileLayout
      heroBanner={<HeroBanner />}
      publications={
        <>
          <h2 className={styles.title}>Публікації</h2>
          <CardsGridLayout>
            {profile?.publications?.map((publication) => (
              <PublicationCard
                publicationCard={publication}
                key={publication.id}
              />
            ))}
          </CardsGridLayout>
        </>
      }
      feedbacks={
        <>
          <h2 className={`${styles.title} ${styles.feedbackTitle}`}>
            Відгуки{' '}
            {profile?.author.feedbacks.length
              ? `(${profile?.author.feedbacks.length})`
              : ''}
          </h2>
          <div className={styles.feedbackContainer}>
            {profile?.author.feedbacks.length ? (
              profile?.author.feedbacks.map((feedback) => (
                // TODO: pass feedback from BE
                <FeedbackCard
                  key={feedback.id}
                  rate={feedback.rating}
                  date={feedback.createdAt}
                  title={feedback.title}
                  description={feedback.review}
                  author={{
                    name: feedback.authorName,
                    surname: feedback.authorSurname,
                    avatarUrl: feedback.image,
                  }}
                />
              ))
            ) : (
              <div className={styles.feedbackEmpty}>Поки що немає відгуків</div>
            )}
          </div>
        </>
      }
    />
  );
};
