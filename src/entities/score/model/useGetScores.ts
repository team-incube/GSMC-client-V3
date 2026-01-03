import { useQuery } from '@tanstack/react-query';

import { getScores, GetScoresRequest } from '../api/getScores';

export const useGetScores = (params: GetScoresRequest) => {
  return useQuery({
    queryKey: ['score', 'list', params],
    queryFn: () => getScores(params),
  });
};
