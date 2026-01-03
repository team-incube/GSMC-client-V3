import { useQueries } from '@tanstack/react-query';

import { useScoreDisplay } from '@/shared/provider/ScoreDisplayProvider';

import { getTotalScore } from '../api/getTotalScore';

export const useGetCombinedTotalScore = () => {
  const { mode } = useScoreDisplay();

  const results = useQueries({
    queries: [
      {
        queryKey: ['score', 'total', { includeApprovedOnly: true }],
        queryFn: () => getTotalScore({ includeApprovedOnly: true }),
      },
      {
        queryKey: ['score', 'total', { includeApprovedOnly: false }],
        queryFn: () => getTotalScore({ includeApprovedOnly: false }),
      },
    ],
  });

  const actualScore = Number(results[0].data?.totalScore ?? 0);
  const combinedScore = Number(results[1].data?.totalScore ?? 0);

  const getValue = () => {
    switch (mode) {
      case 'ACTUAL':
        return actualScore;
      case 'PENDING':
        return combinedScore;
      case 'COMBINED':
        return combinedScore;
      default:
        return 0;
    }
  };

  return {
    value: getValue(),
    actual: actualScore,
    combined: combinedScore,
  };
};
