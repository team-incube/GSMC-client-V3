import { useQuery } from '@tanstack/react-query';

import { getCategoryBySearch, GetCategoryBySearchRequest } from '../api/getCategoryBySearch';

export const useGetCategoryBySearch = (params: GetCategoryBySearchRequest) => {
  return useQuery({
    queryKey: ['category', 'list', params.keyword],
    queryFn: () => getCategoryBySearch(params),
  });
};
