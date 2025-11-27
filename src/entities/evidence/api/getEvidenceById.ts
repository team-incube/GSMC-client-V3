import { instance } from '@/shared/lib/instance';

import { EvidenceType } from '../model/evidence';

export interface getEvidenceByIdRequest {
  evidenceId: number;
}

/**
 * @unused
 */
export const getEvidenceById = async ({
  evidenceId,
}: getEvidenceByIdRequest): Promise<EvidenceType> => {
  const response = await instance.get(`/evidences/${evidenceId}`);
  return response.data.data;
};
