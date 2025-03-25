import { GRAXIS_API_URL } from 'src/config/constants';

export const getAllCategories = async (): Promise<Response> => {
  const response = await fetch(`${GRAXIS_API_URL}/categories`, {
    method: 'GET',
  });

  return response;
};
