import { FirestoreTimestamp } from 'src/types';

export const transformTimestampToDate = (
  timestamp: FirestoreTimestamp | string
): string => {
  let date: Date;

  if (typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    date = new Date(timestamp._seconds * 1000);
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
