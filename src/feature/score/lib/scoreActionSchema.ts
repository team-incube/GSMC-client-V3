import { z } from 'zod';

export const ScoreActionSchema = z
  .object({
    scoreId: z.number().optional(),
    categoryType: z.string().min(1, '카테고리 타입을 선택해주세요.'),
    value: z.string().min(1, '값을 입력해주세요.'),
    fileId: z.number().nullable(),
    evidenceType: z.enum(['EVIDENCE', 'FILE', 'UNREQUIRED']),
  })
  .superRefine((data, ctx) => {
    if (data.evidenceType === 'FILE' && !data.fileId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '파일을 첨부해주세요.',
        path: ['fileId'],
      });
    }
  });
