import { useQueries } from '@tanstack/react-query';

import { getTotalScore } from '../api/getTotalScore';

export const useGetCombinedTotalScore = () => {
  return useQueries({
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
    combine: (results) => ({
      approved: results[0].data?.totalScore,
      expected: results[1].data?.totalScore,
    }),
  });
};
