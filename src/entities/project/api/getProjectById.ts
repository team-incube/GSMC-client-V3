import { instance } from '@/shared/lib/instance';

export const getProjectById = async (projectId: number) => {
  const response = await instance.get(`/projects/${projectId}`);
  return response.data;
};
