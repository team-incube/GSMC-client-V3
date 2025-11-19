import { EvidenceSchema } from '@/entities/evidence/model/EvidenceSchema';
import { ActionState } from '@/shared/type/actionState';
import { ParticipationProjectFormState } from '../model/ParticipationProjectForm';
import z from 'zod';
import { addEvidence } from '@/shared/api/addEvidence';

export const handleProjectParticipation = async (
  _prevState: ActionState<ParticipationProjectFormState>,
  formData: FormData,
): Promise<ActionState<ParticipationProjectFormState>> => {
  const fileIds = formData
    .getAll('fileIds')
    .map(String)
    .map(Number)
    .filter((n) => !isNaN(n));

  const currentData: ParticipationProjectFormState = {
    scoreId: Number(formData.get('scoreId') ?? 0),
    title: String(formData.get('title') ?? '').trim(),
    content: String(formData.get('content') ?? '').trim(),
    fileIds: fileIds.length ? fileIds : null,
  };

  const result = EvidenceSchema.safeParse(currentData);

  if (!result.success) {
    return {
      status: 'error',
      message: '입력값을 확인해주세요.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
      data: currentData,
    };
  }

  const response = await addEvidence(result.data);

  if (response.code === 200) {
    return {
      status: 'success',
      message: '프로젝트 참여글을 생성했습니다.',
      fieldErrors: null,
      data: null,
    };
  }

  return {
    status: 'error',
    message: response.message || '프로젝트 참여글 생성을 실패했습니다.',
    fieldErrors: null,
    data: currentData,
  };
};
