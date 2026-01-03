import { useQuery } from '@tanstack/react-query';

import { getScoresByCategory, GetScoresByCategoryRequest } from '../api/getScoresByCategory';

export const useGetScoresByCategory = (params: GetScoresByCategoryRequest) => {
  return useQuery({
    queryKey: ['score', 'list', 'category', params],
    queryFn: () => getScoresByCategory(params),
  });
};
