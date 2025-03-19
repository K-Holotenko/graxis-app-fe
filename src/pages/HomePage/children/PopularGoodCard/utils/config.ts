export const getDisplayPrice = (
  prices: { price: number; pricingPeriod: string }[]
): { value: number; period: string } | null => {
  const timePeriods = ['day', 'week', 'month'];
  const timePeriodsMap: Record<string, string> = {
    day: 'день',
    week: 'тиждень',
    month: 'місяць',
  };

  const firstAvailablePrice = prices.reduce<{
    value: number;
    period: string;
  } | null>(
    (acc, { price, pricingPeriod }) =>
      acc ||
      (timePeriods.includes(pricingPeriod)
        ? { value: price, period: timePeriodsMap[pricingPeriod] }
        : null),
    null
  );

  return firstAvailablePrice;
};
