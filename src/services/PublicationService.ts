import { UploadFile } from 'antd';

import { GRAXIS_API_URL } from 'src/config/constants';
import { Location } from 'src/pages/AddPublicationPage/children/AddPublicationForm';
import { PricingPeriod } from 'src/pages/PublicationPage/children/Price/utils/count';

import CookieService from './CookieService';

interface Price {
  price: number;
  pricingPeriod: PricingPeriod;
}

export interface Publication {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'ACTIVE';
  bookedDates: [];
  createdAt: string;
  price: Price[];
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
    staticMapImage: string;
  };
  reviewsCount: number;
  feedbackCount: number;
  rate: number;
  pictures: { url: string }[];
}

interface CreatePublicationData {
  categoryName: string;
  title: string;
  description: string;
  prices: Price[];
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

const PUBLICATIONS_API_URL = `${GRAXIS_API_URL}/publications`;

export const createPublication = async (
  publicationData: CreatePublicationData
): Promise<CreatePublicationData> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;
  const formData = new FormData();

  formData.append('categoryName', publicationData.categoryName);
  formData.append('title', publicationData.title);
  formData.append('description', publicationData.description);
  formData.append('prices', JSON.stringify(publicationData.prices));
  formData.append('location', JSON.stringify(publicationData.location));

  publicationData.files?.forEach(({ originFileObj }) => {
    if (originFileObj) formData.append('files', originFileObj);
  });

  const response = await fetch(`${PUBLICATIONS_API_URL}`, {
    method: 'POST',
    headers: { Authorization: token },
    body: formData,
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error();
  }

  return responseBody;
};

export const getAllPublications = async (): Promise<PublicationCard[]> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(`${PUBLICATIONS_API_URL}/search?page=1`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error();
  }

  const responseBody = await response.json();

  return responseBody.publications;
};

export const getPublicationById = async (id: string): Promise<Publication> => {
  const response = await fetch(`${PUBLICATIONS_API_URL}/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error();
  }

  const responseBody = await response.json();

  return responseBody;
};
