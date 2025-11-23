import { HttpStatusCode, isAxiosError } from 'axios';
import z from 'zod';

import { addEvidence } from '@/entities/evidence/api/addEvidence';
import { addProjectScore } from '@/entities/score/api/addProjectScore';
import { ActionState } from '@/shared/model/actionState';

import {
  ParticipationProjectFormValueType,
  ParticipationProjectSchema,
} from '../model/ParticipationProjectSchema';

export const handleProjectParticipation = async (
  _prevState: ActionState<ParticipationProjectFormValueType>,
  formData: FormData,
): Promise<ActionState<ParticipationProjectFormValueType>> => {
  const fileIds = formData
    .getAll('fileIds')
    .map(String)
    .map(Number)
    .filter((n) => !isNaN(n));

  const currentData: ParticipationProjectFormValueType = {
    projectId: Number(formData.get('projectId')),
    title: String(formData.get('title') ?? '').trim(),
    content: String(formData.get('content') ?? '').trim(),
    fileIds: fileIds.length ? fileIds : null,
  };

  const result = ParticipationProjectSchema.safeParse(currentData);

  if (!result.success) {
    return {
      status: 'error',
      message: '입력값을 확인해주세요.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
      data: currentData,
    };
  }

  try {
    const projectId = Number(formData.get('projectId'));
    const scoreResponse = await addProjectScore({ projectId });

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
  } catch (error) {
    let errorMessage = '프로젝트 점수 추가에 실패했습니다.';

    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === HttpStatusCode.Forbidden) {
        errorMessage = '해당 프로젝트에 참여할 수 있는 권한이 없습니다.';
      } else if (status === HttpStatusCode.NotFound) {
        errorMessage = '존재하지 않는 프로젝트입니다.';
      } else if (status === HttpStatusCode.Conflict) {
        errorMessage = '이미 참여한 프로젝트입니다.';
      }
    }

    return {
      status: 'error',
      message: errorMessage,
      fieldErrors: null,
      data: currentData,
    };
  }
};
