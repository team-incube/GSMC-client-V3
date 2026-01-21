import { ScoreType } from '@/entities/score/model/score';
import { instance } from '@/shared/lib/instance';

export interface AddScoreByCategoryTypeRequest {
  categoryType: string;
  value: number | string;
  fileId?: number;
}

const POST_CATEGORIES = [
  'project-participation',
  'external-activity',
  'certificate',
  'award',
];

export const addScoreByCategoryType = async ({
  categoryType,
  value,
  fileId,
}: AddScoreByCategoryTypeRequest): Promise<ScoreType> => {
  if (POST_CATEGORIES.includes(categoryType)) {
    const response = await instance.post(`/scores/${categoryType}`, {
      value,
      fileId,
    });
    return response.data;
  }
  const response = await instance.put(`/scores/${categoryType}`, {
    value,
    fileId,
  });
  return response.data;
};
