import { EvidenceSchema } from '@/entities/evidence/model/EvidenceSchema';
import { ActionState } from '@/shared/type/actionState';
import { ParticipationProjectFormState } from '../model/ParticipationProjectForm';
import z from 'zod';
import { addEvidence } from '@/shared/api/addEvidence';
import { addProjectScore } from '../api/addProjectScore';
import { HttpStatusCode } from 'axios';

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
    projectId: Number(formData.get('projectId')),
    title: String(formData.get('title') ?? '').trim(),
    content: String(formData.get('content') ?? '').trim(),
    fileIds: fileIds.length ? fileIds : null,
  };

  console.log('Current form data:', currentData);

  const result = EvidenceSchema.safeParse(currentData);

  console.log('Parsed result:', result);

  if (!result.success) {
    return {
      status: 'error',
      message: '입력값을 확인해주세요.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
      data: currentData,
    };
  }

  const projectId = Number(formData.get('projectId'));
  const scoreResponse = await addProjectScore(projectId);

  console.log('scoreResponse from addProjectScore:', scoreResponse);

  if (scoreResponse.code !== 200) {
    let errorMessage = '프로젝트 점수 추가에 실패했습니다.';
    if (scoreResponse.code === HttpStatusCode.Forbidden) {
      errorMessage = '해당 프로젝트에 참여할 수 있는 권한이 없습니다.';
    } else if (scoreResponse.code === HttpStatusCode.NotFound) {
      errorMessage = '존재하지 않는 프로젝트입니다.';
    } else if (scoreResponse.code === HttpStatusCode.Conflict) {
      errorMessage = '이미 참여한 프로젝트입니다.';
    }

    return {
      status: 'error',
      message: errorMessage,
      fieldErrors: null,
      data: currentData,
    };
  }

  const evidenceData = {
    ...result.data,
    scoreId: scoreResponse.data.scoreId,
  };

  const response = await addEvidence(evidenceData);

  console.log('response from addEvidence:', response);

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
    message: '프로젝트 참여글 생성을 실패했습니다.',
    fieldErrors: null,
    data: currentData,
  };
};
