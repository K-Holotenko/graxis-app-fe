import { Dayjs } from 'dayjs';

interface PriceItem {
  amount: number;
  period: string;
}

export const calculatePrice = (
  selectedRange: [Dayjs | null, Dayjs | null],
  prices: PriceItem[]
): { totalPrice: number; commission: number; days: number } | 0 => {
  if (!selectedRange[0]) {
    return 0;
  }

  const endDate = selectedRange[1] || selectedRange[0];
  const days = endDate.diff(selectedRange[0], 'day') + 1;
  const dayPrice = prices.find((p) => p.period === '1 день')?.amount || 0;
  const weekPrice = prices.find((p) => p.period === '7 днів')?.amount || 0;
  const monthPrice = prices.find((p) => p.period === '30 днів')?.amount || 0;

  let totalPriceWithoutTax = 0;

  if (days <= 6) {
    totalPriceWithoutTax = days * dayPrice;
  } else if (days === 7) {
    totalPriceWithoutTax = weekPrice;
  } else if (days > 7 && days < 30) {
    const weeks = Math.floor(days / 7);

    totalPriceWithoutTax = weeks * weekPrice;
    const remainingDays = days % 7;

    totalPriceWithoutTax += remainingDays * dayPrice;
  } else if (days === 30) {
    totalPriceWithoutTax = monthPrice;
  } else {
    const months = Math.floor(days / 30);
    const remainingDaysAfterMonths = days % 30;

    totalPriceWithoutTax += months * monthPrice;
    const weeks = Math.floor(remainingDaysAfterMonths / 7);
    const remainingDays = remainingDaysAfterMonths % 7;

    totalPriceWithoutTax += weeks * weekPrice;
    totalPriceWithoutTax += remainingDays * dayPrice;
  }

  const totalPriceWithTax = totalPriceWithoutTax * 1.2;
  const commission = totalPriceWithTax - totalPriceWithoutTax;

  return { totalPrice: totalPriceWithTax, commission, days };
};
