import { instance } from '@/shared/lib/instance';

import { CategoryScoresGroupType, ScoreStatus } from '../model/score';

export interface getScoresByCategoryRequest {
  status?: ScoreStatus;
}

export const getScoresByCategory = async (
  params: getScoresByCategoryRequest,
): Promise<CategoryScoresGroupType[]> => {
  const response = await instance.get(`/scores/by-category`, { params });
  return response.data.data.categories;
};
