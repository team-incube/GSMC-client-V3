'use server';

import { EvidenceFormValues } from '@/feature/evidence/model/evidenceForm.schema';
import getNumericArrayFromFormData from '@/shared/lib/getNumericArrayFromFormData';
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
  const fileIds = getNumericArrayFromFormData({ formData, key: 'fileIds' });
  const intent = formData.get('intent') as string;

  const data: EvidenceFormValues = {
    projectId: formData.get('projectId') ? Number(formData.get('projectId')) : undefined,
    evidenceId: formData.get('evidenceId') ? Number(formData.get('evidenceId')) : undefined,
    scoreId: formData.get('scoreId') ? Number(formData.get('scoreId')) : undefined,
    title: String(formData.get('title') ?? '').trim(),
    content: String(formData.get('content') ?? '').trim(),
    fileIds: fileIds.length ? fileIds : [],
  };

  switch (intent) {
    case 'create':
      return executeEvidenceAction(data, createEvidenceOperation);
    case 'update':
      return executeEvidenceAction(data, updateEvidenceOperation);
    case 'draft':
      return executeEvidenceAction(data, draftEvidenceOperation);
    case 'delete':
      return executeEvidenceAction(data, deleteEvidenceOperation, true);
    default:
      return {
        status: 'error',
        message: '알 수 없는 작업입니다.',
        fieldErrors: null,
        data,
      };
  }
};
