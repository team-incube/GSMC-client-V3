import { instance } from '@/shared/lib/instance';

export const removeDraftProject = async () => {
  const response = await instance.delete(`/projects/draft`);
  return response.data;
};
