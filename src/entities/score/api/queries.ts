import { queryOptions } from '@tanstack/react-query';

import { getPercentScore, GetPercentScoreRequest } from './getPercentScore';
import { getScoreById } from './getScoreById';
import { getScores, GetScoresRequest } from './getScores';
import { getScoresByCategory, GetScoresByCategoryRequest } from './getScoresByCategory';
import { getTotalScore, GetTotalScoreRequest } from './getTotalScore';

export const scoreQueries = {
  all: () => ['score'] as const,
  list: (params: GetScoresRequest) =>
    queryOptions({
      queryKey: [...scoreQueries.all(), 'list', params],
      queryFn: () => getScores(params),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...scoreQueries.all(), 'detail', id],
      queryFn: () => getScoreById({ scoreId: Number(id) }),
    }),
  category: (params?: GetScoresByCategoryRequest) =>
    queryOptions({
      queryKey: [...scoreQueries.all(), 'category', params],
      queryFn: () => getScoresByCategory(params || {}),
    }),
  total: (params?: GetTotalScoreRequest) =>
    queryOptions({
      queryKey: [...scoreQueries.all(), 'total', params],
      queryFn: () => getTotalScore(params || {}),
    }),
  percent: (params: GetPercentScoreRequest) =>
    queryOptions({
      queryKey: [...scoreQueries.all(), 'percent', params],
      queryFn: () => getPercentScore(params),
    }),
};
