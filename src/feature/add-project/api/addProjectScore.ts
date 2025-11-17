import { instance } from '@/shared/lib/axios';

export const addProjectScore = async (projectId: number) => {
  const res = await instance.post('/scores/project-participation', {
    projectId,
  });
  return res.data;
};
