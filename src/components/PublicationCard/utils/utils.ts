export const getDisplayPrice = ({
  price,
  pricingPeriod,
}: {
  price: number;
  pricingPeriod: string;
}): { value: number; period: string } | null => {
  const timePeriods: Record<string, string> = {
    day: 'день',
    week: 'тиждень',
    month: 'місяць',
  };

  const period = timePeriods[pricingPeriod];

  const priceInfo = period ? { value: price, period } : null;

  return priceInfo;
};
