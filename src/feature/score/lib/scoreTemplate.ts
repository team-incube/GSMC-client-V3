import { HttpStatusCode, isAxiosError } from 'axios';
import z from 'zod';

import { ScoreFormSchema, ScoreFormValues } from '@/feature/score/model/scoreForm.schema';
import { ActionState } from '@/shared/model/actionState';

export const executeScoreAction = async (
  data: ScoreFormValues,
  operation: (data: ScoreFormValues) => Promise<string>,
  skipValidation = false,
): Promise<ActionState<ScoreFormValues>> => {
  try {
    if (!skipValidation) {
      const validationError = validateScore(data);
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
    return handleScoreError(error, data);
  }
};

const validateScore = (data: ScoreFormValues): ActionState<ScoreFormValues> | null => {
  const result = ScoreFormSchema.safeParse(data);

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

const handleScoreError = (error: unknown, data: ScoreFormValues): ActionState<ScoreFormValues> => {
  let errorMessage = '작업에 실패했습니다.';

  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === HttpStatusCode.Forbidden) {
      errorMessage = '권한이 없습니다.';
    } else if (status === HttpStatusCode.NotFound) {
      errorMessage = '존재하지 않는 데이터입니다.';
    } else if (status === HttpStatusCode.BadRequest) {
      errorMessage = '잘못된 요청입니다.';
    }
  }

  return {
    status: 'error',
    message: errorMessage,
    fieldErrors: null,
    data,
  };
};
