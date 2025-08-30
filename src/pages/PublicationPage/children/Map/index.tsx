import { Heading } from 'src/components/Heading';
import { Publication } from 'src/types';

import styles from './styles.module.scss';

interface MapProps {
  location: Publication['location'];
}

export const Map = ({
  location: { city, country, locality, staticMapImage },
}: MapProps) => (
  <div>
    <Heading level={4} className={styles.heading}>
      Локація
    </Heading>
    <p className={styles.location}>
      {country}, {city}, {locality}
    </p>
    <div className={styles.mapContainer}>
      <img className={styles.mapImage} src={staticMapImage} />
    </div>
  </div>
);
