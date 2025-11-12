import { instance } from '../lib/axios';

export const getEvidence = async (evidenceId: string) => {
  try {
    const res = await instance.get('/evidences/' + evidenceId);
    return res.data;
  } catch (error) {
    throw error;
  }
};
