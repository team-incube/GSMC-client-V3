import { instance } from '@/shared/lib/instance';

export const removeEvidence = async ({ evidenceId }: { evidenceId: number }) => {
  const response = await instance.delete(`/evidences/${evidenceId}`);
  return response.data;
};
