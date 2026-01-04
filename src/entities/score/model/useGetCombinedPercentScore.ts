import { useQueries } from '@tanstack/react-query';

import { getPercentScore } from '../api/getPercentScore';

export const useGetCombinedPercentScore = ({
  includeApprovedOnly,
}: {
  includeApprovedOnly: boolean;
}) => {
  return useQueries({
    queries: [
      {
        queryKey: ['percentScore', 'class', includeApprovedOnly],
        queryFn: () => getPercentScore({ type: 'class', includeApprovedOnly }),
      },
      {
        queryKey: ['percentScore', 'grade', includeApprovedOnly],
        queryFn: () => getPercentScore({ type: 'grade', includeApprovedOnly }),
      },
    ],
    combine: (results) => {
      const classPercentScore = results[0].data;
      const gradePercentScore = results[1].data;

      return {
        classPercentScore,
        gradePercentScore,
      };
    },
  });
};
