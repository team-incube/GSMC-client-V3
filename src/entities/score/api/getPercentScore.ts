import { instance } from '@/shared/lib/instance';

export interface GetPercentScoreRequest {
  type: 'class' | 'grade';
}

export interface GetPercentScoreResponse {
  topPercentile: number;
  bottomPercentile: number;
}

export const getPercentScore = async ({
  type,
}: GetPercentScoreRequest): Promise<GetPercentScoreResponse> => {
  const response = await instance.get(`/scores/percent/${type}`);
  return response.data.data;
};
