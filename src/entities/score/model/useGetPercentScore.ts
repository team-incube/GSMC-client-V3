import { skipToken, useQuery } from '@tanstack/react-query';

import { getPercentScore, GetPercentScoreRequest } from '../api/getPercentScore';

export const useGetPercentScore = ({ type, includeApprovedOnly }: GetPercentScoreRequest) => {
  return useQuery({
    queryKey: ['percent', 'score', type],
    queryFn: type ? () => getPercentScore({ type, includeApprovedOnly }) : skipToken,
  });
};
