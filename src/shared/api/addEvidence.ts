import { instance } from '../lib/instance';
import { EvidenceRequestType } from '@/entities/evidence/model/evidence';

export const addEvidence = async (evidenceData: EvidenceRequestType) => {
  const response = await instance.post('/evidences', evidenceData);
  return response.data;
};
