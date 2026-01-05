import { useSuspenseQueries } from '@tanstack/react-query';

import { scoreQueries } from '../api/queries';
import { TotalScoreType } from './score';

export const useGetCombinedTotalScore = () => {
  return useSuspenseQueries({
    queries: [
      {
        ...scoreQueries.total({ includeApprovedOnly: true }),
      },
      {
        ...scoreQueries.total({ includeApprovedOnly: false }),
      },
    ],
    combine: (results) => {
      const approved = results[0].data as TotalScoreType;
      const expected = results[1].data as TotalScoreType;

      return {
        approved: approved?.totalScore,
        expected: expected?.totalScore,
      };
    },
  });
};
