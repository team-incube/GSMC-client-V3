import { useQuery } from '@tanstack/react-query';

import { getTotalScore, getTotalScoreRequest } from '../api/getTotalScore';

export const useGetTotalScore = (params: getTotalScoreRequest) => {
  return useQuery({
    queryKey: ['score', 'total', params],
    queryFn: () => getTotalScore(params),
  });
};
