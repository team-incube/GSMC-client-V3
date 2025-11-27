import { EvideceRequestType } from '@/feature/evidence/model/evidenceForm.schema';
import { instance } from '@/shared/lib/instance';

import { EvidenceType } from '../model/evidence';

export interface editEvidenceByIdRequest extends EvideceRequestType {
  evidenceId: number;
}

export const editEvidenceById = async ({
  evidenceId,
  title,
  content,
  fileIds,
}: editEvidenceByIdRequest): Promise<EvidenceType> => {
  const response = await instance.patch(`/evidences/${evidenceId}`, { title, content, fileIds });
  return response.data;
};
