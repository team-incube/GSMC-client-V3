import { instance } from '@/shared/lib/instance';

export const getProjects = async () => {
  const response = await instance.get(`/projects/current`);
  return response.data;
};
