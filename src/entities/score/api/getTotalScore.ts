import { instance } from '@/shared/lib/instance';

import { TotalScoreType } from '../model/score';

export interface getTotalScoreRequest {
  includeApprovedOnly?: boolean;
}

export const getTotalScore = async (params: getTotalScoreRequest): Promise<TotalScoreType> => {
  const response = await instance.get('/scores/total', { params });
  return response.data.data;
};
