import { instance } from '@/shared/lib/instance';

export const removeDraftEvidence = async () => {
  const response = await instance.delete(`/evidences/draft`);
  return response.data;
};
