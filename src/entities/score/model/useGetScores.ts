import { useQuery } from '@tanstack/react-query';

import { getScores, getScoresRequest } from '../api/getScores';

export const useGetScores = (params: getScoresRequest) => {
  return useQuery({
    queryKey: ['score', 'list', params],
    queryFn: () => getScores(params),
  });
};
