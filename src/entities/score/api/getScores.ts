import { instance } from '@/shared/lib/instance';
import { CategoryKey } from '@/shared/type/category';

import { ScoreStatus, ScoreType } from '../model/score';

export interface GetScoresParams {
  categoryType?: CategoryKey;
  status?: ScoreStatus;
}

export const getScores = async (params: GetScoresParams): Promise<ScoreType[]> => {
  const response = await instance.get(`/scores`, { params });
  return response.data;
};
