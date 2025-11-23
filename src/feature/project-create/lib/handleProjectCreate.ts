'use server';

import { isAxiosError } from 'axios';
import z from 'zod';

import { createProject } from '@/entities/project/api/createProject';
import { ActionState } from '@/shared/model/actionState';

import { CreateProjectFormValueType, CreateProjectSchema } from '../model/CreateProjectSchema';

export async function handleProjectCreate(
  _prevState: ActionState<CreateProjectFormValueType>,
  formData: FormData,
): Promise<ActionState<CreateProjectFormValueType>> {
  const participantIds = formData
    .getAll('participantIds')
    .map(String)
    .map(Number)
    .filter((n) => !isNaN(n));

  const fileIds = formData
    .getAll('fileIds')
    .map(String)
    .map(Number)
    .filter((n) => !isNaN(n));

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
    const response = await createProject(result.data);

    if (response.code === 200) {
      return {
        status: 'success',
        message: '프로젝트를 생성했습니다.',
        fieldErrors: null,
        data: null,
      };
    }

    return {
      status: 'error',
      message: response.message || '프로젝트 생성을 실패했습니다.',
      fieldErrors: null,
      data: currentData,
    };
  } catch (error) {
    let errorMessage = '프로젝트 생성을 실패했습니다.';

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      status: 'error',
      message: errorMessage,
      fieldErrors: null,
      data: currentData,
    };
  }
}
