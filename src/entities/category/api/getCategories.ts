import { instance } from '@/shared/lib/instance';

import { CategoryType } from '../model/category';

export const getCategories = async (): Promise<CategoryType[]> => {
  const response = await instance.get(`/categories`);
  return response.data.data.categories;
};
