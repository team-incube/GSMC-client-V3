'use server';

import { HttpStatusCode, isAxiosError } from 'axios';
import z from 'zod';

import { editProjectById } from '@/entities/project/api/editProjectById';
import getNumericArrayFromFormData from '@/shared/lib/getNumericArrayFromFormData';
import { ActionState } from '@/shared/model/actionState';

import { CreateProjectFormValueType, CreateProjectSchema } from '../model/CreateProjectSchema';

export async function handleProjectEdit(
  _prevState: ActionState<CreateProjectFormValueType>,
  formData: FormData,
): Promise<ActionState<CreateProjectFormValueType>> {
  const projectId = Number(formData.get('projectId'));

  if (!projectId || isNaN(projectId)) {
    return {
      status: 'error',
      message: '프로젝트 ID가 유효하지 않습니다.',
      fieldErrors: null,
      data: null,
    };
  }

  const participantIds = formData
    .getAll('participantIds')
    .map(String)
    .map(Number)
    .filter((n) => !isNaN(n));

  const fileIds = getNumericArrayFromFormData({ formData, key: 'fileIds' });

  const currentData: CreateProjectFormValueType = {
    title: String(formData.get('title') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    fileIds: fileIds.length ? fileIds : null,
    participantIds: participantIds,
  };

  const result = CreateProjectSchema.safeParse(currentData);

  if (!result.success) {
    return {
      status: 'error',
      message: '입력값을 확인해주세요.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
      data: currentData,
    };
  }

  try {
    await editProjectById({
      projectId,
      ...result.data,
    });

    return {
      status: 'success',
      message: '프로젝트를 수정했습니다.',
      fieldErrors: null,
      data: null,
    };
  } catch (error) {
    let errorMessage = '프로젝트 수정을 실패했습니다.';

    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === HttpStatusCode.Forbidden) {
        errorMessage = '프로젝트를 수정할 권한이 없습니다.';
      } else if (status === HttpStatusCode.NotFound) {
        errorMessage = '존재하지 않는 프로젝트입니다.';
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
