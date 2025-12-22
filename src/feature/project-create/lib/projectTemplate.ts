import { HttpStatusCode, isAxiosError } from 'axios';
import z from 'zod';

import { ActionState } from '@/shared/model/actionState';

import { ProjectFormSchema, ProjectFormValues } from '../model/projectForm.schema';

export const executeProjectAction = async (
  data: ProjectFormValues,
  operation: (data: ProjectFormValues) => Promise<string>,
  options: { skipValidation?: boolean; isDraft?: boolean } = {},
): Promise<ActionState<ProjectFormValues>> => {
  try {
    if (!options.skipValidation) {
      const validationError = validateProject(data);
      if (validationError) return validationError;
    }

    const message = await operation(data);

    return {
      status: 'success',
      message,
      fieldErrors: null,
      data: null,
    };
  } catch (error) {
    return handleProjectError(error, data);
  }
};

const validateProject = (
  data: ProjectFormValues,
): ActionState<ProjectFormValues> | null => {
  const result = ProjectFormSchema.safeParse(data);
  if (!result.success) {
    return {
      status: 'error',
      message: '입력값을 확인해주세요.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
      data,
    };
  }

  return null;
};

const handleProjectError = (
  error: unknown,
  data: ProjectFormValues,
): ActionState<ProjectFormValues> => {
  let errorMessage = '작업에 실패했습니다.';

  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === HttpStatusCode.Forbidden) {
      errorMessage = '프로젝트를 수정할 권한이 없습니다.';
    } else if (status === HttpStatusCode.NotFound) {
      errorMessage = '존재하지 않는 프로젝트입니다.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
  }

  return {
    status: 'error',
    message: errorMessage,
    fieldErrors: null,
    data,
  };
};
