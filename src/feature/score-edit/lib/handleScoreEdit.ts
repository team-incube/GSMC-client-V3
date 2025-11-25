'use server';

import z from 'zod';

import { CategoryKey } from '@/entities/category/model/category';
import { addScoreByCategoryType } from '@/entities/score/api/addScoreByCategoryType';
import { ActionState } from '@/shared/model/actionState';

import { ScoreFormSchema, ScoreFormValueType } from '../model/ScoreEditSchema';

export async function handleScoreEdit(
  _prevState: ActionState<ScoreFormValueType>,
  formData: FormData,
): Promise<ActionState<ScoreFormValueType>> {
  try {
    const fileIdRaw = formData.get('fileId');
    const fileId = fileIdRaw ? Number(fileIdRaw) : null;

    const categoryTypeInput = String(formData.get('categoryType') ?? '');
    const categoryEndpoint = categoryTypeInput.toLocaleLowerCase();

    const currentData: ScoreFormValueType = {
      categoryType: categoryEndpoint,
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
