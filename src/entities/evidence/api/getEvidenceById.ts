import { instance } from '@/shared/lib/instance';

export interface getScoreByIdRequest {
  evidenceId: string;
}

export const getEvidenceById = async ({ evidenceId }: getScoreByIdRequest) => {
  const response = await instance.get(`/evidences/${evidenceId}`);
  return response.data.data;
};
