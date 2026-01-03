import { instance } from '@/shared/lib/instance';

import { TotalScoreType } from '../model/score';

export interface GetTotalScoreRequest {
  includeApprovedOnly?: boolean;
}

export const getTotalScore = async (params: GetTotalScoreRequest): Promise<TotalScoreType> => {
  const response = await instance.get('/scores/total', { params });
  return response.data.data;
};
