import { useQuery } from '@tanstack/react-query';
import { getScores, GetScoresParams } from '../api/getScores';

export const useGetScores = (params: GetScoresParams) => {
  return useQuery({
    queryKey: ['score', 'list'],
    queryFn: () => getScores(params),
  });
};
