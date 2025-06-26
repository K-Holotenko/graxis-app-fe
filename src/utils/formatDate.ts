import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const getDaysDifference = (
  startDate: string | Date,
  endDate?: string | Date
): number => {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : dayjs();

  return end.diff(start, 'day');
};

export const getWeeksDifference = (
  startDate: string | Date,
  endDate?: string | Date
): number => {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : dayjs();

  return end.diff(start, 'week');
};

export const getMonthsDifference = (
  startDate: string | Date,
  endDate?: string | Date
): number => {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : dayjs();

  return end.diff(start, 'month');
};

export const getYearsDifference = (
  startDate: string | Date,
  endDate?: string | Date
): number => {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : dayjs();

  return end.diff(start, 'year');
};

export const formatRegistrationDate = (
  registrationDate: string | Date
): string => {
  const years = getYearsDifference(registrationDate);
  const months = getMonthsDifference(registrationDate);
  const weeks = getWeeksDifference(registrationDate);
  const days = getDaysDifference(registrationDate);

  if (years > 0) {
    return `${years} ${years === 1 ? 'рік' : years < 5 ? 'роки' : 'років'}`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? 'місяць' : months < 5 ? 'місяці' : 'місяців'}`;
  } else if (weeks > 0) {
    return `${weeks} ${weeks === 1 ? 'тиждень' : weeks < 5 ? 'тижні' : 'тижнів'}`;
  } else {
    return `${days} ${days === 1 ? 'день' : days < 5 ? 'дні' : 'днів'}`;
  }
};
