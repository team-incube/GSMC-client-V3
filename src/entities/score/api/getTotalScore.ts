import { instance } from '@/shared/lib/instance';

export const getTotalScore = async () => {
  const response = await instance.get(`/scores/total`);
  return response.data;
};
