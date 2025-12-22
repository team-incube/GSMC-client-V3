'use server';

import { EvidenceFormValues } from '@/feature/evidence/model/evidenceForm.schema';
import { uploadFilesFromFormData } from '@/shared/lib/uploadFilesFromFormData';
import { ActionState } from '@/shared/model/actionState';

import {
  createEvidenceOperation,
  deleteEvidenceOperation,
  draftEvidenceOperation,
  updateEvidenceOperation,
} from './evidenceOperations';
import { executeEvidenceAction } from './evidenceTemplate';

export const handleEvidenceAction = async (
  _prevState: ActionState<EvidenceFormValues>,
  formData: FormData,
): Promise<ActionState<EvidenceFormValues>> => {
  const intent = formData.get('intent') as string;

  let fileIds: number[] = [];
  try {
    fileIds = await uploadFilesFromFormData(formData, { multiple: true });
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : '파일 업로드에 실패했습니다.',
      fieldErrors: null,
      data: {} as EvidenceFormValues,
    };
  }

  const data: EvidenceFormValues = {
    projectId: formData.get('projectId') ? Number(formData.get('projectId')) : undefined,
    evidenceId: formData.get('evidenceId') ? Number(formData.get('evidenceId')) : undefined,
    scoreId: formData.get('scoreId') ? Number(formData.get('scoreId')) : undefined,
    title: String(formData.get('title') ?? '').trim(),
    content: String(formData.get('content') ?? '').trim(),
    fileIds: fileIds.length ? fileIds : [],
    isDraft: formData.get('isDraft') === 'true',
  };

  switch (intent) {
    case 'create':
      return executeEvidenceAction(data, createEvidenceOperation);
    case 'update':
      return executeEvidenceAction(data, updateEvidenceOperation);
    case 'draft':
      return executeEvidenceAction(data, draftEvidenceOperation, { isDraft: true });
    case 'delete':
      return executeEvidenceAction(data, deleteEvidenceOperation, { skipValidation: true });
    default:
      return {
        status: 'error',
        message: '알 수 없는 작업입니다.',
        fieldErrors: null,
        data,
      };
  }
};
