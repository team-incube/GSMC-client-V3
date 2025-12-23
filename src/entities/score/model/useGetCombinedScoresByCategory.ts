import { useQueries } from '@tanstack/react-query';

import { getScoresByCategory } from '../api/getScoresByCategory';

export const useGetCombinedScoresByCategory = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['score', 'list', 'category', { status: 'APPROVED' }],
        queryFn: () => getScoresByCategory({ status: 'APPROVED' }),
      },
      {
        queryKey: ['score', 'list', 'category', {}],
        queryFn: () => getScoresByCategory({}),
      },
    ],
    combine: (results) => {
      const approved = results[0].data;
      const all = results[1].data;

      return all?.map((category) => ({
        categoryType: category.categoryType,
        categoryNames: category.categoryNames,
        approvedScore:
          approved?.find((c) => c.categoryType === category.categoryType)?.recognizedScore ?? 0,
        expectedScore: category.recognizedScore,
        scores: category.scores,
      }));
    },
  });
};
