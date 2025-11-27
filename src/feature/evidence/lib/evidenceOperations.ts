import { addDraftEvidence } from '@/entities/evidence/api/addDraftEvidence';
import { addEvidence } from '@/entities/evidence/api/addEvidence';
import { editEvidenceById } from '@/entities/evidence/api/editEvidenceById';
import { removeDraftEvidence } from '@/entities/evidence/api/removeDraftEvidence';
import { removeEvidence } from '@/entities/evidence/api/removeEvidence';
import { addProjectScore } from '@/entities/score/api/addProjectScore';
import { removeScoreById } from '@/entities/score/api/removeScoreById';
import { EvidenceFormValues } from '@/feature/evidence/model/evidenceForm.schema';

export const createEvidenceOperation = async (formData: EvidenceFormValues): Promise<string> => {
  if (!formData.projectId) {
    throw new Error('Project ID is required for update');
  }

  const scoreResponse = await addProjectScore({ projectId: formData.projectId });

  const request = {
    projectId: formData.projectId,
    scoreId: scoreResponse.data.scoreId,
    title: formData.title,
    content: formData.content,
    fileIds: formData.fileIds,
  };

  try {
    await addEvidence(request);
    return '프로젝트 참여글을 작성했습니다.';
  } catch (error) {
    await removeScoreById({ scoreId: scoreResponse.data.scoreId });
    throw error;
  }
};

export const updateEvidenceOperation = async (formData: EvidenceFormValues): Promise<string> => {
  if (!formData.evidenceId) {
    throw new Error('Evidence ID is required for update');
  }

  const request = {
    evidenceId: formData.evidenceId,
    scoreId: formData.scoreId,
    title: formData.title,
    content: formData.content,
    fileIds: formData.fileIds,
  };

  await editEvidenceById(request);
  return '수정되었습니다.';
};

export const draftEvidenceOperation = async (formData: EvidenceFormValues): Promise<string> => {
  const request = {
    title: formData.title,
    content: formData.content,
    fileIds: formData.fileIds,
  };

  await addDraftEvidence(request);
  return '임시저장되었습니다.';
};

export const deleteEvidenceOperation = async (formData: EvidenceFormValues): Promise<string> => {
  if (formData.evidenceId) {
    await removeEvidence({ evidenceId: formData.evidenceId });
  } else {
    await removeDraftEvidence();
  }
  return '삭제되었습니다.';
};
