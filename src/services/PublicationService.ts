import { UploadFile } from 'antd';
import axios from 'axios';

import {
  Publication,
  MyPublication,
  CreatePublicationData,
  PublicationPage,
} from 'src/types';

import { api } from './api';

const PUBLICATIONS_API_URL = '/publications';

export const createPublication = async (
  publicationData: CreatePublicationData
): Promise<Publication> => {
  const formData = new FormData();

  formData.append('categoryName', publicationData.categoryName);
  formData.append('title', publicationData.title);
  formData.append('description', publicationData.description);
  formData.append('prices', JSON.stringify(publicationData.prices));
  formData.append('location', JSON.stringify(publicationData.location));

  publicationData.files?.forEach(({ originFileObj }: UploadFile) => {
    if (originFileObj) formData.append('files', originFileObj);
  });

  const response = await api.post(`${PUBLICATIONS_API_URL}`, formData);

  return response.data;
};

export const getAllPublications = async (
  search: string = ''
): Promise<PublicationPage> => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_GRAXIS_API_URL}${PUBLICATIONS_API_URL}/search${search}`
  );

  return response.data;
};

export const getAllMyPublications = async (
  search: string = ''
): Promise<Publication[]> => {
  const response = await api.get(`${PUBLICATIONS_API_URL}/my${search}`);

  return response.data;
};

export const getPublicationById = async (id: string): Promise<Publication> => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_GRAXIS_API_URL}${PUBLICATIONS_API_URL}/${id}`
  );

  return response.data;
};

export const updatePublication = async (
  publicationData: CreatePublicationData,
  id?: string
): Promise<MyPublication> => {
  const formData = new FormData();

  formData.append('categoryName', publicationData.categoryName);
  formData.append('title', publicationData.title);
  formData.append('description', publicationData.description);
  formData.append('prices', JSON.stringify(publicationData.prices));
  formData.append('location', JSON.stringify(publicationData.location));

  publicationData.files?.forEach(({ originFileObj }: UploadFile) => {
    if (originFileObj) formData.append('files', originFileObj);
  });

  const response = await api.patch(`${PUBLICATIONS_API_URL}/${id}`, formData);

  return response.data;
};

export const getMyPublicationById = async (
  id: string
): Promise<MyPublication> => {
  const response = await api.get(`${PUBLICATIONS_API_URL}/my/${id}`);

  return response.data;
};

export const deletePublicationImageById = async (
  publicationId: string | undefined,
  imageId?: string
): Promise<string> => {
  const response = await api.delete(
    `${PUBLICATIONS_API_URL}/${publicationId}/image/${imageId}`
  );

  return response.data;
};

export const deletePublicationById = async (id: string): Promise<boolean> => {
  const response = await api.delete(`${PUBLICATIONS_API_URL}/${id}`);

  return response.data;
};
