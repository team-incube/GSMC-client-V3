import { instance } from '@/shared/lib/instance';

export interface TotalScore {
  totalScore: string;
}

export const getTotalScore = async (): Promise<TotalScore> => {
  const response = await instance.get('/scores/total');
  return response.data.data;
};
