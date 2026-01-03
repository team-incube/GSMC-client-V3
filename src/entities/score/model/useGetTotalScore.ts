import { useQuery } from '@tanstack/react-query';

import { getTotalScore, GetTotalScoreRequest } from '../api/getTotalScore';

export const useGetTotalScore = (params: GetTotalScoreRequest) => {
  return useQuery({
    queryKey: ['score', 'total', params],
    queryFn: () => getTotalScore(params),
  });
};
