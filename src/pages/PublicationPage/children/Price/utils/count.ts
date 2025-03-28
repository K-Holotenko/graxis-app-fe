import { Dayjs } from 'dayjs';

import { Publication } from 'src/services/PublicationService';

export enum PricingPeriod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export const pricingPeriodEngToUkrMap: Record<PricingPeriod, string> = {
  [PricingPeriod.DAY]: 'день',
  [PricingPeriod.WEEK]: 'тиждень',
  [PricingPeriod.MONTH]: 'місяць',
};

const FEE_PERCENT = 20;
const WEEK = 7;
const MONTH = 30;

export const calculatePrice = (
  selectedRange: [Dayjs | null, Dayjs | null],
  prices: Publication['price']
): { totalPrice: number; commission: number; days: number } => {
  if (!selectedRange[0]) {
    return { totalPrice: 0, commission: 0, days: 0 };
  }

  const endDate = selectedRange[1] || selectedRange[0];
  const days = endDate.diff(selectedRange[0], PricingPeriod.DAY) + 1;
  const dayPrice =
    prices.find((p) => p.pricingPeriod === PricingPeriod.DAY)?.price || 0;
  const weekPrice =
    prices.find((p) => p.pricingPeriod === PricingPeriod.WEEK)?.price || 0;
  const monthPrice =
    prices.find((p) => p.pricingPeriod === PricingPeriod.MONTH)?.price || 0;

  let monthCount = 0,
    weekCount = 0,
    dayCount = 0,
    leftDays = days;

  if (monthPrice) {
    monthCount = Math.floor(leftDays / MONTH);
    leftDays -= monthCount * MONTH;
  }

  if (weekPrice) {
    weekCount = Math.floor(leftDays / WEEK);
    leftDays -= weekCount * WEEK;
  }

  if (dayPrice) {
    dayCount = leftDays;
  }

  const totalPriceWithoutFee =
    monthCount * monthPrice + weekCount * weekPrice + dayCount * dayPrice;

  const commission = Math.round((totalPriceWithoutFee * FEE_PERCENT) / 100);
  const totalPrice = Math.round(totalPriceWithoutFee + commission);

  return { totalPrice, commission, days };
};
