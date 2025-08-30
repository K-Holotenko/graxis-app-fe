import axios from 'axios';

import { Category } from 'src/types';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_GRAXIS_API_URL}/categories`
  );

  return response.data;
};
