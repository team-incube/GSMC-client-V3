import { EvideceRequestType } from '@/feature/evidence/model/evidenceForm.schema';
import { instance } from '@/shared/lib/instance';

import { EvidenceType } from '../model/evidence';

export const addEvidence = async (evidenceData: EvideceRequestType): Promise<EvidenceType> => {
  const response = await instance.post('/evidences', evidenceData);
  return response.data;
};
