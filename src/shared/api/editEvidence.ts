import { instance } from '@/shared/lib/instance';

export const editEvidence = async (evidenceId: number) => {
  const response = await instance.patch(`/evidences/${evidenceId}`);
  return response.data;
};
