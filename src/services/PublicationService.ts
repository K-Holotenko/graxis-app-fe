import { UploadFile } from 'antd';

import { GRAXIS_API_URL } from 'src/config/constants';
import { Location } from 'src/pages/AddPublicationPage/children/AddPublicationForm';
import { ProductData } from 'src/pages/SearchResultsPage/children/PublicationsSection';

import CookieService from './CookieService';

interface Price {
  price: number;
  pricingPeriod: string;
}

interface PublicationData {
  categoryName: string;
  title: string;
  description: string;
  prices: Price[];
  location: Location;
  files: UploadFile[];
}

export const createPublication = async (
  publicationData: PublicationData
): Promise<PublicationData> => {
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

  const response = await fetch(`${GRAXIS_API_URL}/publications`, {
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

export const getAllPublications = async (): Promise<ProductData[]> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(`${GRAXIS_API_URL}/publications/all?limit=16`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error();
  }

  const responseBody = await response.json();

  return responseBody;
};
