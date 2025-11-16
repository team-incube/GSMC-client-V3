import { instance } from '../lib/axios';

export const getEvidence = async (evidenceId: string) => {
  const res = await instance.get('/evidences/' + evidenceId);
  return res.data;
};
