import { instance } from '@/shared/lib/instance';

import { CategoryScoresGroupType, ScoreStatus } from '../model/score';

export interface GetScoresByCategoryRequest {
  status?: ScoreStatus;
}

export const getScoresByCategory = async (
  params: GetScoresByCategoryRequest,
): Promise<CategoryScoresGroupType[]> => {
  const response = await instance.get(`/scores/by-category`, { params });
  return response.data.data.categories;
};
