import { instance } from '@/shared/lib/instance';

import { ScoreType } from '../model/score';

export interface addProjectScoreRequest {
  projectId: number;
}

export const addProjectScore = async ({
  projectId,
}: addProjectScoreRequest): Promise<ScoreType> => {
  const response = await instance.post('/scores/project-participation', {
    projectId,
  });
  return response.data.data;
};
