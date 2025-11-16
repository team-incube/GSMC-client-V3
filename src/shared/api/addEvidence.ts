import { instance } from '../lib/axios';
import { EvidenceRequestType } from '../type/evidence';

export const addEvidence = async (evidenceData: EvidenceRequestType) => {
  const res = await instance.post('/evidences', evidenceData);
  return res.data;
};
