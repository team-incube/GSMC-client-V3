import { useQuery } from '@tanstack/react-query';

import { GetTotalScoreRequest } from '../api/getTotalScore';
import { scoreQueries } from '../api/queries';

export const useGetTotalScore = (params: GetTotalScoreRequest) => {
  return useQuery(scoreQueries.total(params));
};
