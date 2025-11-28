import { addScoreByCategoryType } from '@/entities/score/api/addScoreByCategoryType';
import { editScoreById } from '@/entities/score/api/editScoreById';
import { removeScoreById } from '@/entities/score/api/removeScoreById';
import { ScoreFormValues } from '@/feature/score/model/scoreForm.schema';

export const createScoreOperation = async (formData: ScoreFormValues): Promise<string> => {
  await addScoreByCategoryType({
    categoryType: formData.categoryType,
    value: formData.value,
    fileId: formData.fileId || undefined,
  });

  return '점수가 성공적으로 추가되었습니다.';
};

export const updateScoreOperation = async (formData: ScoreFormValues): Promise<string> => {
  if (!formData.scoreId) {
    throw new Error('Score ID is required for update');
  }

  const editableCategories = ['external-activity', 'certificate', 'award'];

  if (editableCategories.includes(formData.categoryType)) {
    await editScoreById({
      categoryType: formData.categoryType as 'external-activity' | 'certificate' | 'award',
      scoreId: formData.scoreId,
      value: String(formData.value),
      fileId: formData.fileId || undefined,
    });
  } else {
    await addScoreByCategoryType({
      categoryType: formData.categoryType,
      value: formData.value,
      fileId: formData.fileId || undefined,
    });
  }

  return '수정되었습니다.';
};

export const deleteScoreOperation = async (formData: ScoreFormValues): Promise<string> => {
  if (!formData.scoreId) {
    throw new Error('Score ID is required for deletion');
  }

  await removeScoreById({ scoreId: formData.scoreId });

  return '삭제되었습니다.';
};
