import { instance } from '@/shared/lib/instance';

import { DraftEvidenceType } from '../model/evidence';

export const getDraftEvidence = async (): Promise<DraftEvidenceType | null> => {
  const response = await instance.get(`/evidences/draft`);
  return response.data?.data ?? null;
};
