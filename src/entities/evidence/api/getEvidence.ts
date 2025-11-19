import { instance } from '@/shared/lib/instance';

export const getEvidence = async (evidenceId: string) => {
  const res = await instance.get(`/evidences/${evidenceId}`);
  return res.data;
};
