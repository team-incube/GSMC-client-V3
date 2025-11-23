'use server';

import z from 'zod';

import { editEvidenceById } from '@/shared/api/editEvidenceById';
import { ActionState } from '@/shared/type/actionState';

import { EvidenceFormSchema, EvidenceFormValueType } from '../model/ScoreEditSchema';

export async function handleEvidenceEdit(
  _prevState: ActionState<EvidenceFormValueType>,
  formData: FormData,
): Promise<ActionState<EvidenceFormValueType>> {
  try {
    const fileIds = formData
      .getAll('fileIds')
      .map(String)
      .map(Number)
      .filter((n) => !isNaN(n));

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

    const response = await editEvidenceById({
      evidenceId: result.data.evidenceId,
      title: result.data.title,
      content: result.data.content,
      fileIds: result.data.fileIds || [],
    });

    return { status: 'success', message: '수정되었습니다.', fieldErrors: null, data: null };
  } catch (error) {
    return { status: 'error', message: '수정에 실패했습니다.', fieldErrors: null, data: null };
  }
}
