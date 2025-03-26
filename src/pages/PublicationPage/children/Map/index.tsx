import { Heading } from 'src/components/Heading';
import { Publication } from 'src/services/PublicationService';

import styles from './styles.module.scss';

interface MapProps {
  location: Publication['location'];
}

export const Map = ({
  location: { city, country, staticMapImage },
}: MapProps) => (
  <div>
    <Heading level={4} className={styles.heading}>
      Локація
    </Heading>
    <p className={styles.location}>
      {country}, {city}
    </p>
    <div className={styles.mapContainer}>
      <img className={styles.mapImage} src={staticMapImage} />
    </div>
  </div>
);
