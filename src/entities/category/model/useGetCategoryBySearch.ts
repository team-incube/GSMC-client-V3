import { useQuery } from '@tanstack/react-query';

import { getCategoryBySearch, getCategoryBySearchRequest } from '../api/getCategoryBySearch';

export const useGetCategoryBySearch = (params: getCategoryBySearchRequest) => {
  return useQuery({
    queryKey: ['category', 'list', params.keyword],
    queryFn: () => getCategoryBySearch(params),
  });
};
