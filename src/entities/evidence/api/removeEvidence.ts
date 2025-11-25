import { instance } from '@/shared/lib/instance';

/**
 * @unused
 */
export const removeEvidence = async (evidenceId: string) => {
  const response = await instance.delete(`/evidences/${evidenceId}`);
  return response.data;
};
