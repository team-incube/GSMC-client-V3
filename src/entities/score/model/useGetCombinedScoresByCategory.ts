import { useQueries } from '@tanstack/react-query';

import { getCategories } from '@/entities/category/api/getCategories';
import { CategoryKey } from '@/entities/category/model/category';

import { getScoresByCategory } from '../api/getScoresByCategory';
import { CategoryScoresGroupType } from './score';

export const useGetCombinedScoresByCategory = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['score', 'list', 'category', { status: 'APPROVED' }],
        queryFn: () => getScoresByCategory({ status: 'APPROVED' }),
        select: (data: CategoryScoresGroupType[]) =>
          data.map((c) => ({
            ...c,
            categoryType: c.categoryType.replace(/_/g, '-') as CategoryKey,
          })),
      },
      {
        queryKey: ['score', 'list', 'category', {}],
        queryFn: () => getScoresByCategory({}),
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
      const approved = results[0].data;
      const all = results[1].data;
      const categories = results[2].data;

      const approvedScoresMap = new Map(approved?.map((c) => [c.categoryType, c.recognizedScore]));
      const categoriesMap = new Map(categories?.map((c) => [c.englishName, c]));

      return all?.map((category) => {
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
