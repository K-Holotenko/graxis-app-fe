import { UploadFile } from 'antd';

import { Location } from './common';

export enum PublicationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RENTED_OUT = 'RENTED_OUT',
  DELETED = 'DELETED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export interface Publication {
  id: string;
  title: string;
  category: string;
  description: string;
  status: PublicationStatus;
  bookedDates: [];
  createdAt: string;
  price: { price: number; pricingPeriod: string }[];
  ownerInfo: {
    id: string;
    avatarUrl: string;
    name: string;
    surname: string;
    reviewCount: number;
    joinedAt: string;
    rate: number;
  };
  location: {
    country: string;
    city: string;
    locality: string;
    staticMapImage: string;
  } & Location;
  reviewsCount: number;
  feedbackCount: number;
  rate: number;
  pictures: { url: string; id?: string }[];
}

export type MyPublication = Omit<Publication, 'location'> & {
  location: Location;
};

export interface CreatePublicationData {
  categoryName: string;
  title: string;
  description: string;
  prices: { price: number; pricingPeriod: string }[];
  location: Location;
  files: UploadFile[];
}

export interface PublicationCard {
  id: string;
  rate: number;
  reviewCount: number;
  thumbnailUrl: string;
  title: string;
  price: { price: number; pricingPeriod: string };
}

export interface PublicationPage {
  publications: PublicationCard[];
  nextPage: number | null;
  total: number;
}
