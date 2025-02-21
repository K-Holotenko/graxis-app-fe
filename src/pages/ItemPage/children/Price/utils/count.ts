import { Dayjs } from 'dayjs';

interface PriceItem {
  amount: number;
  period: string;
}

const FEE_PERCENT = 20;
const WEEK = 7;
const MONTH = 30;

export const calculatePrice = (
  selectedRange: [Dayjs | null, Dayjs | null],
  prices: PriceItem[]
): { totalPrice: number; commission: number; days: number } => {
  if (!selectedRange[0]) {
    return { totalPrice: 0, commission: 0, days: 0 };
  }

  const endDate = selectedRange[1] || selectedRange[0];
  const days = endDate.diff(selectedRange[0], 'day') + 1;
  const dayPrice = prices.find((p) => p.period === '1 день')?.amount || 0;
  const weekPrice = prices.find((p) => p.period === '7 днів')?.amount || 0;
  const monthPrice = prices.find((p) => p.period === '30 днів')?.amount || 0;

  let totalPriceWithoutFee = 0;

  if (days < WEEK) {
    totalPriceWithoutFee = days * dayPrice;
  } else if (days === WEEK) {
    totalPriceWithoutFee = weekPrice;
  } else if (days > WEEK && days < MONTH) {
    const weeks = Math.floor(days / WEEK);

    totalPriceWithoutFee = weeks * weekPrice + (days % WEEK) * dayPrice;
  } else if (days === MONTH) {
    totalPriceWithoutFee = monthPrice;
  } else {
    const months = Math.floor(days / MONTH);
    const remainingDays = days % MONTH;
    const weeks = Math.floor(remainingDays / WEEK);
    const extraDays = remainingDays % WEEK;

    totalPriceWithoutFee =
      months * monthPrice + weeks * weekPrice + extraDays * dayPrice;
  }

  const commission = Math.round((totalPriceWithoutFee * FEE_PERCENT) / 100);
  const totalPrice = Math.round(totalPriceWithoutFee + commission);

  return { totalPrice, commission, days };
};
