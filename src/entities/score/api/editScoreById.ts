import { instance } from '@/shared/lib/instance';

import { ScoreType } from '../model/score';

export interface editScoreByIdRequest {
  categoryType: 'external-activity' | 'certificate' | 'award';
  scoreId: number;
  value: string;
  fileId: number;
}

export const editScoreById = async ({
  categoryType,
  scoreId,
  value,
  fileId,
}: editScoreByIdRequest): Promise<ScoreType> => {
  const response = await instance.patch(`/scores/${categoryType}/${scoreId}`, {
    value,
    fileId,
  });
  return response.data.data;
};
