import { instance } from '@/shared/lib/instance';

export interface editEvidenceRequest {
  evidenceId: number;
  title: string;
  content: string;
  fileIds: number[];
}

export const editEvidenceById = async ({
  evidenceId,
  title,
  content,
  fileIds,
}: editEvidenceRequest) => {
  const response = await instance.patch(`/evidences/${evidenceId}`, { title, content, fileIds });
  return response.data;
};
