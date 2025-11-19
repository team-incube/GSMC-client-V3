import { instance } from '@/shared/lib/instance';

export const getDraftProject = async () => {
  const response = await instance.get(`/projects/draft`);
  return response.data;
};
