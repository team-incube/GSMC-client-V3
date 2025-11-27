import { DraftEvidenceType } from '@/entities/evidence/model/evidence';
import { EvideceRequestType } from '@/feature/evidence/model/evidenceForm.schema';
import { instance } from '@/shared/lib/instance';

export const addDraftEvidence = async (
  evidenceData: EvideceRequestType,
): Promise<DraftEvidenceType> => {
  const response = await instance.post('/evidences/draft', evidenceData);
  return response.data;
};
