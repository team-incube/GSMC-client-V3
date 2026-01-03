import { instance } from '@/shared/lib/instance';

import { ScoreType } from '../model/score';

export interface AddProjectScoreRequest {
  projectId: number;
}

export const addProjectScore = async ({
  projectId,
}: AddProjectScoreRequest): Promise<ScoreType> => {
  const response = await instance.post('/scores/project-participation', {
    projectId,
  });
  return response.data.data;
};
