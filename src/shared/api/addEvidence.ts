import { instance } from '../lib/axios';
import { EvidenceRequestType } from '../type/evidence';

export const addEvidence = async (evidenceData: EvidenceRequestType) => {
  try {
    const res = await instance.post('/evidences', evidenceData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
