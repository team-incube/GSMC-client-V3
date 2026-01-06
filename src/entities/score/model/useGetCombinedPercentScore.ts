import { useSuspenseQueries } from '@tanstack/react-query';

import { GetPercentScoreResponse } from '../api/getPercentScore';
import { scoreQueries } from '../api/queries';

export const useGetCombinedPercentScore = ({
  includeApprovedOnly,
}: {
  includeApprovedOnly: boolean;
}) => {
  return useSuspenseQueries({
    queries: [
      {
        ...scoreQueries.percent({ type: 'class', includeApprovedOnly }),
      },
      {
        ...scoreQueries.percent({ type: 'grade', includeApprovedOnly }),
      },
    ],
    combine: (results) => {
      const classPercentScore = results[0].data as GetPercentScoreResponse;
      const gradePercentScore = results[1].data as GetPercentScoreResponse;

      return {
        classPercentScore,
        gradePercentScore,
      };
    },
  });
};
