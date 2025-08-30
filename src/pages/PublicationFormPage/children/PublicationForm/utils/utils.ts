import { UploadFile } from 'antd';

import { PricingPeriod } from 'src/pages/PublicationPage/children/Price/utils/count';
import { MyPublication, Location } from 'src/types';

interface PriceInputs {
  priceDay?: number;
  priceWeek?: number;
  priceMonth?: number;
}

interface FormFieldValues {
  category: string;
  title: string;
  description: string;
  photos: UploadFile[];
  priceDay: number;
  priceWeek: number;
  priceMonth: number;
  location: Location;
}

export const mapPublicationToFormFields = (
  publication: MyPublication
): FormFieldValues => {
  const { category, title, description, pictures, price, location } =
    publication;

  const { priceDay, priceWeek, priceMonth } = price?.reduce(
    (acc, item) => {
      if (item.pricingPeriod === 'day') {
        acc.priceDay = item.price;
      } else if (item.pricingPeriod === 'week') {
        acc.priceWeek = item.price;
      } else if (item.pricingPeriod === 'month') {
        acc.priceMonth = item.price;
      }

      return acc;
    },
    { priceDay: 0, priceWeek: 0, priceMonth: 0 }
  );

  const transformedPictures = pictures?.map((pic, index) => ({
    uid: pic.id || `temp-${Date.now()}-${index}`,
    name: extractPictureNameFromUrl(pic.url),
    status: 'done',
    url: pic.url,
  }));

  const transformedLocation = {
    country: location?.country || '',
    city: location?.city || '',
    locality: location?.locality || '',
    lat: location?.lat || 0,
    lng: location?.lng || 0,
  };

  return {
    category,
    title,
    description,
    photos: transformedPictures as UploadFile[],
    priceDay,
    priceWeek,
    priceMonth,
    location: transformedLocation,
  };
};

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

export const extractPictureNameFromUrl = (url: string): string => {
  if (!url) return '';

  const segments = url.split('/');
  const fileName = segments[segments.length - 1];

  return decodeURIComponent(fileName);
};
