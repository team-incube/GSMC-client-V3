import { instance } from '@/shared/lib/instance';

import { CategoryType } from '../model/category';

export interface GetCategoryBySearchRequest {
  keyword: string;
}

export const getCategoryBySearch = async (
  params: GetCategoryBySearchRequest,
): Promise<CategoryType[]> => {
  const response = await instance.get(`/categories/search`, { params });
  return response.data.data.categories;
};
