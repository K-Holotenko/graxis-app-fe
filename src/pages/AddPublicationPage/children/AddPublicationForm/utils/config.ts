import { PricingPeriod } from 'src/pages/PublicationPage/children/Price/utils/count';

interface PriceInputs {
  priceDay?: number;
  priceWeek?: number;
  priceMonth?: number;
}

export const formatPrices = ({
  priceDay,
  priceWeek,
  priceMonth,
}: PriceInputs): { price: number; pricingPeriod: PricingPeriod }[] =>
  [
    priceDay && { price: Number(priceDay), pricingPeriod: PricingPeriod.DAY },
    priceWeek && {
      price: Number(priceWeek),
      pricingPeriod: PricingPeriod.WEEK,
    },
    priceMonth && {
      price: Number(priceMonth),
      pricingPeriod: PricingPeriod.MONTH,
    },
  ].filter((price): price is { price: number; pricingPeriod: PricingPeriod } =>
    Boolean(price)
  );
