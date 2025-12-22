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
      const validationError = validateEvidence(data);
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
): ActionState<EvidenceFormValues> | null => {
  const schema = z.object({
    title: z.string().min(1, '제목을 입력해주세요.'),
    isDraft: z.boolean().optional(),
    content: z.string(),
    fileIds: z.array(z.number()),
  }).superRefine((data, ctx) => {
    if (!data.isDraft) {
      if (data.content.length < 300) {
        ctx.addIssue({
          code: 'custom',
          message: '최소 300자 이상 입력해주세요',
          path: ['content'],
        });
      }
      if (data.content.length > 2000) {
        ctx.addIssue({
          code: 'custom',
          message: '최대 2000자 이하 입력해주세요',
          path: ['content'],
        });
      }
      if (data.fileIds.length < 1) {
        ctx.addIssue({
          code: 'custom',
          message: '최소 1개의 파일을 첨부해주세요',
          path: ['fileIds'],
        });
      }
    }
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
