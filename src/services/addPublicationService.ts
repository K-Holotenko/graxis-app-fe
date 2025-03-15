import { Location } from 'src/pages/AddPublicationPage/children/AddPublicationForm';

import CookieService from './CookieService';

interface Price {
  price: number;
  pricingPeriod: string;
}

interface FileItem {
  originFileObj: File;
}

interface PublicationData {
  categoryName: string;
  title: string;
  description: string;
  prices: Price[];
  location: Location;
  files: FileItem[];
}

export const addPublicationService = async (
  publicationData: PublicationData
): Promise<PublicationData> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;
  const formData = new FormData();

  (['categoryName', 'title', 'description'] as const).forEach((key) => {
    formData.append(key, publicationData[key]);
  });

  formData.append('prices', JSON.stringify(publicationData.prices));
  formData.append('location', JSON.stringify(publicationData.location));

  publicationData.files?.forEach(({ originFileObj }) => {
    if (originFileObj) formData.append('files', originFileObj);
  });

  const response = await fetch(
    'https://graxis-be-774272313958.europe-central2.run.app/publications',
    {
      method: 'POST',
      headers: { Authorization: token },
      body: formData,
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error();
  }

  return responseBody;
};
