import { instance } from '../lib/instance';

export const removeEvidence = async (evidenceId: string) => {
  const response = await instance.delete(`/evidences/${evidenceId}`);
  return response.data;
};
