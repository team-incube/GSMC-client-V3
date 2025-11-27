'use server';

import { ScoreFormValues } from '@/feature/score/model/scoreForm.schema';
import { ActionState } from '@/shared/model/actionState';

import {
  createScoreOperation,
  deleteScoreOperation,
  updateScoreOperation,
} from './scoreOperations';
import { executeScoreAction } from './scoreTemplate';

export const handleScoreAction = async (
  _prevState: ActionState<ScoreFormValues>,
  formData: FormData,
): Promise<ActionState<ScoreFormValues>> => {
  const fileIdRaw = formData.get('fileId');
  const fileId = fileIdRaw ? Number(fileIdRaw) : null;
  const intent = String(formData.get('intent'));

  const data: ScoreFormValues = {
    scoreId: formData.get('scoreId') ? Number(formData.get('scoreId')) : undefined,
    categoryType: String(formData.get('categoryType') ?? '').toLowerCase(),
    value: String(formData.get('value') ?? '').trim(),
    fileId: fileId,
    evidenceType: formData.get('evidenceType') as 'EVIDENCE' | 'FILE' | 'UNREQUIRED',
  };

  switch (intent) {
    case 'create':
      return executeScoreAction(data, createScoreOperation);
    case 'update':
      return executeScoreAction(data, updateScoreOperation);
    case 'delete':
      return executeScoreAction(data, deleteScoreOperation, true);
    default:
      return {
        status: 'error',
        message: '알 수 없는 작업입니다.',
        fieldErrors: null,
        data,
      };
  }
};
