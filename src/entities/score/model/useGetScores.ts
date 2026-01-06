import { useQuery } from '@tanstack/react-query';

import { GetScoresRequest } from '../api/getScores';
import { scoreQueries } from '../api/queries';

export const useGetScores = (params: GetScoresRequest) => {
  return useQuery(scoreQueries.list(params));
};
