import { useMemo } from 'react';
import { StaticMap, createStaticMapsUrl } from '@vis.gl/react-google-maps';

import { generateCircle } from 'src/pages/ItemPage/children/LocationMap/utils/generateCircle';
import { Heading } from 'src/components/Heading';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

interface LocationMapProps {
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

export const LocationMap = ({
  locationName,
  coordinates,
}: LocationMapProps) => {
  const circleRadius = 0.005;
  const latOffset = 0.005;
  const lngOffset = 0.005;

  const circleCoordinates = useMemo(
    () =>
      generateCircle(
        coordinates.lat + latOffset,
        coordinates.lng + lngOffset,
        circleRadius
      ),
    [coordinates.lat, coordinates.lng, circleRadius, latOffset, lngOffset]
  );

  const staticMapsUrl = createStaticMapsUrl({
    apiKey: API_KEY,
    width: 1280,
    height: 432,
    center: {
      lat: coordinates.lat + latOffset,
      lng: coordinates.lng + lngOffset,
    },
    zoom: 14,
    scale: 2,
    paths: [
      {
        color: '0xC0D32C45',
        fillcolor: '0xC0D32C45',
        weight: 1,
        coordinates: circleCoordinates,
      },
    ],
  });

  return (
    <>
      <Heading level={4} className={styles.heading}>
        {TEXT.LOCATION_NAME}
      </Heading>
      <span className={styles.name}>{locationName}</span>
      <div className={styles.mapContainer}>
        <StaticMap url={staticMapsUrl} />
      </div>
    </>
  );
};
