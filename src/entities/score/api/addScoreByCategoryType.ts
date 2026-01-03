import { ScoreType } from '@/entities/score/model/score';
import { instance } from '@/shared/lib/instance';

export interface AddScoreByCategoryTypeRequest {
  categoryType: string;
  value: number | string;
  fileId?: number;
}

export const addScoreByCategoryType = async ({
  categoryType,
  value,
  fileId,
}: AddScoreByCategoryTypeRequest): Promise<ScoreType> => {
  const response = await instance.post(`/scores/${categoryType}`, { value, fileId });
  return response.data;
};
