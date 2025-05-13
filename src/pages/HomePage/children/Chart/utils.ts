import { Publication } from 'src/services/PublicationService';

import { DataPoint } from '.';

interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export const convertFirestoreTimestampToDate = (
  data: Publication[]
): DataPoint[] => {
  const groupedByDate = data.reduce(
    (acc: { [key: string]: number }, publication: Publication) => {
      let date;

      if (publication.createdAt !== null) {
        const timestamp =
          publication.createdAt as unknown as FirestoreTimestamp;
        // Convert seconds to milliseconds

        date = new Date(timestamp._seconds * 1000).toLocaleDateString();
      } else {
        // Fallback in case it's a string
        date = new Date(publication.createdAt as string).toLocaleDateString();
      }

      if (!acc[date]) {
        acc[date] = 0;
      }

      acc[date] += 1;

      return acc;
    },
    {}
  );

  const formattedData = Object.entries(groupedByDate).map(([date, count]) => ({
    date,
    publicationNumber: count,
  }));

  formattedData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA.getTime() - dateB.getTime();
  });

  return formattedData;
};
