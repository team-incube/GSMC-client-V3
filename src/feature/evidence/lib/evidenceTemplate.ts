import { HttpStatusCode, isAxiosError } from 'axios';
import z from 'zod';

import { EvidenceFormValues } from '@/feature/evidence/model/evidenceForm.schema';
import { ActionState } from '@/shared/model/actionState';

export const executeEvidenceAction = async (
  data: EvidenceFormValues,
  operation: (data: EvidenceFormValues) => Promise<string>,
  options: { skipValidation?: boolean; isDraft?: boolean } = {},
): Promise<ActionState<EvidenceFormValues>> => {
  try {
    if (!options.skipValidation) {
      const validationError = validateEvidence(data, options.isDraft);
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
    return handleEvidenceError(error, data);
  }
};

const validateEvidence = (
  data: EvidenceFormValues,
  isDraft = false,
): ActionState<EvidenceFormValues> | null => {
  const schema = z.object({
    title: isDraft ? z.string() : z.string().min(1, '제목을 입력해주세요.'),
    content: isDraft ? z.string() : z.string().min(1, '내용을 입력해주세요.'),
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

const handleEvidenceError = (
  error: unknown,
  data: EvidenceFormValues,
): ActionState<EvidenceFormValues> => {
  let errorMessage = '작업에 실패했습니다.';

  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === HttpStatusCode.Forbidden) {
      errorMessage = '권한이 없습니다.';
    } else if (status === HttpStatusCode.NotFound) {
      errorMessage = '존재하지 않는 데이터입니다.';
    } else if (status === HttpStatusCode.Conflict) {
      errorMessage = '이미 참여한 프로젝트입니다.';
    }
  }

  return {
    status: 'error',
    message: errorMessage,
    fieldErrors: null,
    data,
  };
};
