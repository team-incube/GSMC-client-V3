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
  const response = POST_CATEGORIES.includes(categoryType)
    ? await instance.post(`/scores/${categoryType}`, { value, fileId })
    : await instance.put(`/scores/${categoryType}`, { value, fileId });
  return response.data;
};
