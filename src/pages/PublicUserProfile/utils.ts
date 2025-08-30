import { FirestoreTimestamp } from 'src/types';

export const transformTimestampToDate = (
  timestamp: FirestoreTimestamp
): string => {
  const date = new Date(timestamp._seconds * 1000);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
