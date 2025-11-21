import { useQuery } from '@tanstack/react-query';

import { getScoresByCategory, GetScoresByCategoryParams } from '../api/getScoresByCategory';

export const useGetcoresByCategory = (params: GetScoresByCategoryParams) => {
  return useQuery({
    queryKey: ['score', 'list', 'category'],
    queryFn: () => getScoresByCategory(params),
  });
};
