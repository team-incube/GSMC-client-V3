'use server';

import { uploadFilesFromFormData } from '@/shared/lib/uploadFilesFromFormData';
import { ActionState } from '@/shared/model/actionState';

import {
  createScoreOperation,
  deleteScoreOperation,
  updateScoreOperation,
} from './scoreOperations';
import { executeScoreAction } from './scoreTemplate';

export interface ScoreActionData {
  scoreId?: number;
  categoryType: string;
  value: string;
  fileId: number | null;
  evidenceType: 'EVIDENCE' | 'FILE' | 'UNREQUIRED';
}

export const handleScoreAction = async (
  _prevState: ActionState<ScoreActionData>,
  formData: FormData,
): Promise<ActionState<ScoreActionData>> => {
  const intent = String(formData.get('intent'));

  let fileId: number | null = null;
  try {
    const fileIds = await uploadFilesFromFormData(formData, { multiple: false });
    fileId = fileIds.length > 0 ? fileIds[0] : null;
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : '파일 업로드에 실패했습니다.',
      fieldErrors: null,
      data: {} as ScoreActionData,
    };
  }

  const data: ScoreActionData = {
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
