import { instance } from '@/shared/lib/instance';

export const getEvidence = async (evidenceId: string) => {
  const response = await instance.get(`/evidences/${evidenceId}`);
  return response.data;
};
