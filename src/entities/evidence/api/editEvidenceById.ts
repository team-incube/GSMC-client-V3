import { EvidenceRequestSchema } from '@/feature/evidence/model/evidenceForm.schema';
import { instance } from '@/shared/lib/instance';

import { EvidenceType } from '../model/evidence';

export interface EditEvidenceByIdRequest extends EvidenceRequestSchema {
  evidenceId: number;
}

export const editEvidenceById = async ({
  evidenceId,
  title,
  content,
  fileIds,
}: EditEvidenceByIdRequest): Promise<EvidenceType> => {
  const response = await instance.patch(`/evidences/${evidenceId}`, { title, content, fileIds });
  return response.data;
};
