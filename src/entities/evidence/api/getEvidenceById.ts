import { instance } from '@/shared/lib/instance';

import { EvidenceType } from '../model/evidence';

export interface getScoreByIdRequest {
  evidenceId: number;
}

export const getEvidenceById = async ({
  evidenceId,
}: getScoreByIdRequest): Promise<EvidenceType> => {
  const response = await instance.get(`/evidences/${evidenceId}`);
  return response.data.data;
};
