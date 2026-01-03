import { skipToken, useQuery } from '@tanstack/react-query';

import { getPercentScore, GetPercentScoreRequest } from '../api/getPercentScore';

export const useGetPercentScore = ({ type }: GetPercentScoreRequest) => {
  return useQuery({
    queryKey: ['percent', 'score', type],
    queryFn: type ? () => getPercentScore({ type }) : skipToken,
  });
};
