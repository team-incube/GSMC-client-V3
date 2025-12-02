import { HttpStatusCode, isAxiosError } from 'axios';
import z from 'zod';

import { ActionState } from '@/shared/model/actionState';

import { ProjectFormValues } from '../model/projectForm.schema';

export const executeProjectAction = async (
  data: ProjectFormValues,
  operation: (data: ProjectFormValues) => Promise<string>,
  options: { skipValidation?: boolean; isDraft?: boolean } = {},
): Promise<ActionState<ProjectFormValues>> => {
  try {
    if (!options.skipValidation) {
      const validationError = validateProject(data, options.isDraft);
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
  isDraft = false,
): ActionState<ProjectFormValues> | null => {
  const schema = z.object({
    title: isDraft ? z.string() : z.string().min(1, '제목을 입력해주세요.'),
    description: isDraft ? z.string() : z.string().min(1, '설명을 입력해주세요.'),
    participantIds: isDraft
      ? z.array(z.number())
      : z.array(z.number()).nonempty('프로젝트 참여 팀원을 선택해주세요.'),
    fileIds: z.array(z.number()).optional(),
  });

  const result = schema.safeParse(data);

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
