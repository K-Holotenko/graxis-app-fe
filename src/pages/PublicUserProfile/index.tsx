import { HeroBanner } from 'src/pages/PublicUserProfile/children/HeroBanner';
import { CardsGridLayout } from 'src/layouts/CardsGridLayout';
import { PublicationCard } from 'src/components/PublicationCard';
import { PublicProfileLayout } from 'src/layouts/PublicProfileLayout';

import styles from './styles.module.scss';
import { FeedbackCard } from './children/FeedbackCard';
import { feedbacks, publications } from './fixtures/fixtures';

export const PublicUserProfile = () => (
  <PublicProfileLayout
    heroBanner={<HeroBanner />}
    publications={
      <>
        <h2 className={styles.title}>Публікації</h2>
        <CardsGridLayout>
          {publications.map((publication) => (
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
          Відгуки ({feedbacks.length})
        </h2>
        <div className={styles.feedbackContainer}>
          {feedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              rate={feedback.rate}
              date={feedback.date}
              title={feedback.title}
              description={feedback.description}
              author={{
                name: feedback.author.name,
                surname: feedback.author.surname,
                avatarUrl: feedback.author.avatarUrl,
              }}
            />
          ))}
        </div>
      </>
    }
  />
);
