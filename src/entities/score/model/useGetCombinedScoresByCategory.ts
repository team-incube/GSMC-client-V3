import { useQueries } from '@tanstack/react-query';

import { getCategories } from '@/entities/category/api/getCategories';
import { CategoryKey } from '@/entities/category/model/category';
import { useScoreDisplay } from '@/shared/provider/ScoreDisplayProvider';

import { getScoresByCategory } from '../api/getScoresByCategory';
import { CategoryScoresGroupType, ScoreStatus } from './score';

export const useGetCombinedScoresByCategory = () => {
  const { mode } = useScoreDisplay();

  const status: ScoreStatus | undefined =
    mode === 'ACTUAL' ? 'APPROVED' : mode === 'PENDING' ? 'PENDING' : undefined;

  return useQueries({
    queries: [
      {
        queryKey: ['score', 'list', 'category', { status }],
        queryFn: () => getScoresByCategory({ status }),
        select: (data: CategoryScoresGroupType[]) =>
          data.map((c) => ({
            ...c,
            categoryType: c.categoryType.replace(/_/g, '-') as CategoryKey,
          })),
      },
      {
        queryKey: ['category', 'list'],
        queryFn: getCategories,
      },
    ],
    combine: (results) => {
      const scoreData = results[0].data;
      const categories = results[1].data;

      const categoriesMap = new Map(categories?.map((c) => [c.englishName, c]));

      return scoreData?.map((category) => {
        const categoryInfo = categoriesMap.get(category.categoryType);
        const approvedScore = category.scores
          .filter((s) => s.scoreStatus === 'APPROVED')
          .reduce((acc, s) => acc + s.scoreValue, 0);

        return {
          categoryType: category.categoryType,
          categoryNames: category.categoryNames,
          score: category.recognizedScore,
          approvedScore,
          scores: category.scores,
          isMaxReached: categoryInfo
            ? category.scores.length >= categoryInfo.maxRecordCount
            : false,
        };
      });
    },
  });
};
