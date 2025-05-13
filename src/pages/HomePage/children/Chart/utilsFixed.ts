import { Publication } from 'src/services/PublicationService';

import { DataPoint } from '.';

interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export const convertFirestoreTimestampToDate = (
  data: Publication[]
): DataPoint[] => {
  const publicationsByDate = new Map<
    string,
    { count: number; rawTimestamp: number }
  >();

  data.forEach((publication) => {
    if (!publication.createdAt) return;

    let timestamp: number;

    if (
      typeof publication.createdAt === 'object' &&
      publication.createdAt !== null
    ) {
      const firestoreTime =
        publication.createdAt as unknown as FirestoreTimestamp;

      timestamp = firestoreTime._seconds * 1000; // Convert to milliseconds
    } else {
      timestamp = new Date(publication.createdAt as string).getTime();
    }

    if (isNaN(timestamp)) return;

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    if (publicationsByDate.has(dateKey)) {
      publicationsByDate.get(dateKey)!.count++;
    } else {
      publicationsByDate.set(dateKey, {
        count: 1,
        rawTimestamp: timestamp,
      });
    }
  });

  const sortedEntries = Array.from(publicationsByDate.entries()).sort(
    ([keyA], [keyB]) =>
      // Sort by the ISO format string which is naturally chronological
      keyA.localeCompare(keyB)
  );

  return sortedEntries.map(([dateKey, chartData]) => ({
    date: new Date(dateKey).toLocaleDateString(),
    publicationNumber: chartData.count,
  }));
};
