import { instance } from '../lib/instance';

export const getTotalScore = async (): Promise<{ totalScore: string }> => {
  const response = await instance.get('/scores/total');
  return response.data.data;
};
