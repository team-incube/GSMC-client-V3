import { skipToken, useQuery } from '@tanstack/react-query';

import { useScoreDisplay } from '@/shared/provider/ScoreDisplayProvider';

import { getPercentScore, GetPercentScoreRequest } from '../api/getPercentScore';

export const useGetPercentScore = ({
  type,
}: Omit<GetPercentScoreRequest, 'includeApprovedOnly'>) => {
  const { mode } = useScoreDisplay();
  const includeApprovedOnly = mode === 'ACTUAL'; // ACTUAL만 true, 나머지는 false

  return useQuery({
    queryKey: ['percent', 'score', type, mode],
    queryFn: type ? () => getPercentScore({ type, includeApprovedOnly }) : skipToken,
  });
};
