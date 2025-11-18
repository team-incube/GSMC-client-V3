import { instance } from '../lib/instance';

/**
 * 사용자 점수 총점 반환
 */
export const getTotalScore = async (): Promise<{ totalScore: string }> => {
  const response = await instance.get('/scores/total');
  console.log(response);
  return response.data;
};
