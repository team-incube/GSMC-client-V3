'use server';

import z from 'zod';

import { addScoreByCategoryType } from '@/shared/api/addScoreByCategoryType';
import { ActionState } from '@/shared/type/actionState';
import { CategoryEndpoint, CategoryKey } from '@/shared/type/category';

import { ScoreAddFormValueType, ScoreAddSchema } from '../model/ScoreAddSchema';

export const handleScoreAdd = async (
  _prevState: ActionState<ScoreAddFormValueType>,
  formData: FormData,
): Promise<ActionState<ScoreAddFormValueType>> => {
  try {
    const fileIdRaw = formData.get('fileId');
    const fileId = fileIdRaw ? Number(fileIdRaw) : null;

    const categoryTypeInput = String(formData.get('categoryType') ?? '');
    const categoryEndpoint =
      CategoryEndpoint[categoryTypeInput as CategoryKey] || categoryTypeInput.toLocaleLowerCase();

    const currentData: ScoreAddFormValueType = {
      categoryType: categoryEndpoint,
      value: String(formData.get('value') ?? '').trim(),
      fileId: fileId,
      evidenceType: formData.get('evidenceType') as 'EVIDENCE' | 'FILE' | 'UNREQUIRED',
    };

    const result = ScoreAddSchema.safeParse(currentData);

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

    return {
      status: 'success',
      message: '점수가 성공적으로 추가되었습니다.',
      fieldErrors: null,
      data: null,
    };
  } catch (error) {
    return {
      status: 'error',
      message: '점수 추가에 실패했습니다.',
      fieldErrors: null,
      data: null,
    };
  }
};
