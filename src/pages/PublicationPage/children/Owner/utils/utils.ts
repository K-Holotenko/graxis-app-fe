import dayjs from 'dayjs';

export const getTimeWithUs = (joinedAt?: string): string => {
  if (!joinedAt) return 'Just joined';
  const now = dayjs();
  const start = dayjs(joinedAt);
  const diffInMonths = now.diff(start, 'month');
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;

  if (years > 0) {
    if (months > 0) {
      return `${years} ${years > 1 ? 'років' : 'рік'} ${months} ${
        months > 1 ? 'місяців' : 'місяць'
      }`;
    }

    return `${years} ${years > 1 ? 'років' : 'рік'}`;
  }

  if (months > 0) {
    return `${months} ${months > 1 ? 'місяців' : 'місяць'}`;
  }

  const diffInWeeks = now.diff(start, 'week');

  if (diffInWeeks < 1) {
    return 'менше тижня';
  }

  return `${diffInWeeks} ${diffInWeeks > 1 ? 'тижнів' : 'тиждень'}`;
};
