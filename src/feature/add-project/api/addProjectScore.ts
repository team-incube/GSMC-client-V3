import { instance } from '@/shared/lib/instance';

export const addProjectScore = async (projectId: number) => {
  const res = await instance.post('/scores/project-participation', {
    projectId,
  });
  return res.data;
};
