import { instance } from '@/shared/lib/instance';

import { CategoryType } from '../model/category';

export interface GetCategoryBySearchParams {
  keyword: string;
}

export const getCategoryBySearch = async (
  params: GetCategoryBySearchParams,
): Promise<CategoryType[]> => {
  const response = await instance.get(`/categories/search`, { params });
  return response.data.data.categories;
};
