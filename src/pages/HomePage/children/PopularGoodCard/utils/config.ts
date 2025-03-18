export const getDisplayPrice = (
  prices: { price: number; pricingPeriod: string }[]
): { value: number; period: string } | null => {
  const duration = ['day', 'week', 'month'];
  const periods: Record<string, string> = {
    day: 'день',
    week: 'тиждень',
    month: 'місяць',
  };

  return prices.reduce<{ value: number; period: string } | null>(
    (acc, { price, pricingPeriod }) =>
      acc ||
      (duration.includes(pricingPeriod)
        ? { value: price, period: periods[pricingPeriod] }
        : null),
    null
  );
};
