import { CategoryKey } from '@/entities/category/model/category';
import { instance } from '@/shared/lib/instance';

import { ScoreStatus, ScoreType } from '../model/score';

export interface GetScoresRequest {
  categoryType?: CategoryKey;
  status?: ScoreStatus;
}

export const getScores = async (params: GetScoresRequest): Promise<ScoreType[]> => {
  const response = await instance.get(`/scores`, { params });
  return response.data.data.scores;
};
