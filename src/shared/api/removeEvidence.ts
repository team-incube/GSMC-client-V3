import { instance } from '../lib/instance';

export const removeEvidence = async (evidenceId: string) => {
  const res = await instance.delete(`/evidences/${evidenceId}`);
  return res.data;
};
