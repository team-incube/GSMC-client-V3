'use server';

import z from 'zod';

import { editEvidenceById } from '@/entities/evidence/api/editEvidenceById';
import {
  EvidenceFormSchema,
  EvidenceFormValueType,
} from '@/feature/score-edit/model/ScoreEditSchema';
import getNumericArrayFromFormData from '@/shared/lib/getNumericArrayFromFormData';
import { ActionState } from '@/shared/model/actionState';
import { HttpStatusCode, isAxiosError } from 'axios';

export async function handleEvidenceEdit(
  _prevState: ActionState<EvidenceFormValueType>,
  formData: FormData,
): Promise<ActionState<EvidenceFormValueType>> {
  const fileIds = getNumericArrayFromFormData({ formData, key: 'fileIds' });

  const currentData: EvidenceFormValueType = {
    evidenceId: Number(formData.get('evidenceId')),
    title: String(formData.get('title') ?? '').trim(),
    content: String(formData.get('content') ?? '').trim(),
    fileIds: fileIds.length ? fileIds : null,
  };

  const result = EvidenceFormSchema.safeParse(currentData);

  if (!result.success) {
    return {
      status: 'error',
      message: '입력값을 확인해주세요.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
      data: currentData,
    };
  }

  try {
    await editEvidenceById({
      evidenceId: result.data.evidenceId,
      title: result.data.title,
      content: result.data.content,
      fileIds: result.data.fileIds || [],
    });

    return { status: 'success', message: '수정되었습니다.', fieldErrors: null, data: null };
  } catch (error) {
    let errorMessage = '증빙자료 수정에 실패했습니다.';

    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === HttpStatusCode.NotFound) {   
        errorMessage = '존재하지 않는 증빙자료입니다.';
      } 
    }

    return {
      status: 'error',
      message: errorMessage,
      fieldErrors: null,
      data: currentData,
    };
  }
}
