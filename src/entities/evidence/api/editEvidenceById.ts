import { instance } from '@/shared/lib/instance';

export interface editEvidenceByIdRequest {
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
}: editEvidenceByIdRequest) => {
  const response = await instance.patch(`/evidences/${evidenceId}`, { title, content, fileIds });
  return response.data;
};
