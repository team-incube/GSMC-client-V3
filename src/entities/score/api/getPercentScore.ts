import { instance } from '@/shared/lib/instance';

export interface GetPercentScoreRequest {
  type: 'class' | 'grade';
  includeApprovedOnly?: boolean;
}

export interface GetPercentScoreResponse {
  topPercentile: number;
  bottomPercentile: number;
}

export const getPercentScore = async ({
  type,
  includeApprovedOnly,
}: GetPercentScoreRequest): Promise<GetPercentScoreResponse> => {
  const response = await instance.get(`/scores/percent/${type}`, {
    params: {
      includeApprovedOnly,
    },
  });
  return response.data.data;
};
