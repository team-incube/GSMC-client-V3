import { instance } from '@/shared/lib/instance';

export interface addProjectScoreRequest {
  projectId: number;
}

export const addProjectScore = async ({ projectId }: addProjectScoreRequest) => {
  const response = await instance.post('/scores/project-participation', {
    projectId,
  });
  return response.data;
};
