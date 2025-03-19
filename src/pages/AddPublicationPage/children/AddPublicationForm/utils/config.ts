interface PriceInputs {
  priceDay?: number;
  priceWeek?: number;
  priceMonth?: number;
}

export const formatPrices = ({
  priceDay,
  priceWeek,
  priceMonth,
}: PriceInputs): { price: number; pricingPeriod: string }[] =>
  [
    priceDay && { price: Number(priceDay), pricingPeriod: 'day' },
    priceWeek && { price: Number(priceWeek), pricingPeriod: 'week' },
    priceMonth && { price: Number(priceMonth), pricingPeriod: 'month' },
  ].filter((price): price is { price: number; pricingPeriod: string } =>
    Boolean(price)
  );
