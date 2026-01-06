import { useSuspenseQueries } from '@tanstack/react-query';

import { getCategories } from '@/entities/category/api/getCategories';
import { CategoryKey } from '@/entities/category/model/category';

import { scoreQueries } from '../api/queries';
import { CategoryScoresGroupType } from './score';

export const useGetCombinedScoresByCategory = () => {
  return useSuspenseQueries({
    queries: [
      {
        ...scoreQueries.category({ status: 'APPROVED' }),
        select: (data: CategoryScoresGroupType[]) =>
          data.map((c) => ({
            ...c,
            categoryType: c.categoryType.replace(/_/g, '-') as CategoryKey,
          })),
      },
      {
        ...scoreQueries.category({}),
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
      const approved = results[0].data as CategoryScoresGroupType[];
      const all = results[1].data as CategoryScoresGroupType[];
      const categories = results[2].data;

      const approvedScoresMap = new Map(approved.map((c) => [c.categoryType, c.recognizedScore]));
      const categoriesMap = new Map(categories.map((c) => [c.englishName, c]));

      return all.map((category) => {
        const categoryInfo = categoriesMap.get(category.categoryType);
        return {
          categoryType: category.categoryType,
          categoryNames: category.categoryNames,
          approvedScore: approvedScoresMap.get(category.categoryType) ?? 0,
          expectedScore: category.recognizedScore,
          scores: category.scores,
          isMaxReached: categoryInfo
            ? category.scores.length >= categoryInfo.maxRecordCount
            : false,
        };
      });
    },
  });
};
