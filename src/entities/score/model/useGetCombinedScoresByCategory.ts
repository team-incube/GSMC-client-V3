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

      const approvedScoresMap = new Map(approved?.map((c) => [c.categoryType, c.recognizedScore]));

      return all?.map((category) => ({
        categoryType: category.categoryType,
        categoryNames: category.categoryNames,
        approvedScore: approvedScoresMap.get(category.categoryType) ?? 0,
        expectedScore: category.recognizedScore,
        scores: category.scores,
      }));
    },
  });
};
