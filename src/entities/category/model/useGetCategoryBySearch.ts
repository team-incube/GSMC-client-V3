import { useQuery } from '@tanstack/react-query';

import { getCategoryBySearch, GetCategoryBySearchParams } from '../api/getCategoryBySearch';

export const useGetCategoryBySearch = (params: GetCategoryBySearchParams) => {
  return useQuery({
    queryKey: ['category', 'list', params.keyword],
    queryFn: () => getCategoryBySearch(params),
  });
};
