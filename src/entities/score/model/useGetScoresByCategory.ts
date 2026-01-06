import { useQuery } from '@tanstack/react-query';

import { GetScoresByCategoryRequest } from '../api/getScoresByCategory';
import { scoreQueries } from '../api/queries';

export const useGetScoresByCategory = (params: GetScoresByCategoryRequest) => {
  return useQuery(scoreQueries.category(params));
};
