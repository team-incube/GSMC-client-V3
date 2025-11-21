import { instance } from '@/shared/lib/instance';
import { CategoryKey } from '@/shared/type/category';

import { CategoryNames, ScoreStatus, ScoreType } from '../model/score';

export interface GetScoresByCategoryParams {
  status?: ScoreStatus;
}

export interface getScoresByCategoryResponse {
  categoryType: CategoryKey;
  categoryNames: CategoryNames;
  recognizedScore: number;
  scores: ScoreType[];
}

export const getScoresByCategory = async (
  params: GetScoresByCategoryParams,
): Promise<getScoresByCategoryResponse[]> => {
  const response = await instance.get(`/scores/by-category`, { params });
  return response.data.data.categories;
};
