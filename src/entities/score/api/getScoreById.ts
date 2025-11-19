import { instance } from '@/shared/lib/instance';

export const getScoreById = async (scoreId: number) => {
  const response = await instance.get(`/scores/${scoreId}`);
  return response.data;
};
