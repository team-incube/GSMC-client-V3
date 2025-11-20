import { instance } from '@/shared/lib/instance';

export const addProjectScore = async (projectId: number) => {
  const response = await instance.post('/scores/project-participation', {
    projectId,
  });
  return response.data;
};
