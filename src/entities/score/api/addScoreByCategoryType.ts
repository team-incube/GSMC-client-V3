import { ScoreType } from '@/entities/score/model/score';
import { instance } from '@/shared/lib/instance';

export interface addScoreByCategoryTypeRequest {
  categoryType: string;
  value: number | string;
  fileId?: number;
}

export const addScoreByCategoryType = async ({
  categoryType,
  value,
  fileId,
}: addScoreByCategoryTypeRequest): Promise<ScoreType> => {
  const response = await instance.post(`/scores/${categoryType}`, { value, fileId });
  return response.data;
};
