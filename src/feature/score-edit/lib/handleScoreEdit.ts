'use server';

import z from 'zod';

import { addScoreByCategoryType } from '@/shared/api/addScoreByCategoryType';
import { ActionState } from '@/shared/type/actionState';

import { ScoreFormSchema, ScoreFormValueType } from '../model/ScoreEditSchema';

export async function handleScoreValueEdit(
  _prevState: ActionState<ScoreFormValueType>,
  formData: FormData,
): Promise<ActionState<ScoreFormValueType>> {
  try {
    const fileIdRaw = formData.get('fileId');
    const fileId = fileIdRaw ? Number(fileIdRaw) : null;

    const currentData: ScoreFormValueType = {
      categoryType: String(formData.get('categoryType') ?? '').toLocaleLowerCase(),
      value: String(formData.get('value') ?? '').trim(),
      fileId: fileId,
      evidenceType: formData.get('evidenceType') as 'EVIDENCE' | 'FILE' | 'UNREQUIRED',
    };

    const result = ScoreFormSchema.safeParse(currentData);

    if (!result.success) {
      return {
        status: 'error',
        message: '입력값을 확인해주세요.',
        fieldErrors: z.flattenError(result.error).fieldErrors,
        data: currentData,
      };
    }

    await addScoreByCategoryType({
      categoryType: result.data.categoryType,
      value: result.data.value,
      fileId: result.data.fileId || undefined,
    });

    return { status: 'success', message: '수정되었습니다.', fieldErrors: null, data: null };
  } catch {
    return { status: 'error', message: '수정에 실패했습니다.', fieldErrors: null, data: null };
  }
}
