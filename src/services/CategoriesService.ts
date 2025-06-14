import axios from 'axios';

import { GRAXIS_API_URL } from 'src/config/constants';
import { Category } from 'src/stores/categoriesStore';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${GRAXIS_API_URL}/categories`);

  return response.data;
};
