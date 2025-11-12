import { instance } from '../lib/axios';

export const removeEvidence = async (evidenceId: string) => {
  try {
    const res = await instance.delete('/evidences/' + evidenceId);
    return res.data;
  } catch (error) {
    throw error;
  }
};
