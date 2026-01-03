import { instance } from '@/shared/lib/instance';

import { ScoreType } from '../model/score';

export interface GetScoreByIdRequest {
  scoreId: number;
}

export const getScoreById = async ({ scoreId }: GetScoreByIdRequest): Promise<ScoreType> => {
  const response = await instance.get(`/scores/${scoreId}`);
  return response.data.data;
};
