import { ScoreType } from '@/entities/score/model/score';
import { instance } from '@/shared/lib/instance';

export interface RemoveScoreByIdTypeRequest {
  scoreId: number;
}

export const removeScoreById = async ({
  scoreId,
}: RemoveScoreByIdTypeRequest): Promise<ScoreType> => {
  const response = await instance.delete(`/scores/${scoreId}`);
  return response.data;
};
