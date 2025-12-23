import { z } from 'zod';

export const ScoreFormSchema = z
  .object({
    scoreId: z.number().optional(),
    categoryType: z.string().toLowerCase().min(1, '카테고리 타입을 선택해주세요.'),
    value: z.union([
      z.string().min(1, '제목을 입력해주세요.'),
      z.number().min(1, '점수를 입력해주세요.'),
    ]),
    fileId: z.number('파일을 첨부해주세요.').nullable(),
    evidenceType: z.enum(['EVIDENCE', 'FILE', 'UNREQUIRED']),
  })
  .refine(
    (data) => {
      if (data.evidenceType === 'FILE' && !data.fileId) {
        return false;
      }
      return true;
    },
    {
      message: '파일을 첨부해주세요.',
      path: ['fileId'],
    },
  );

export type ScoreFormValues = z.infer<typeof ScoreFormSchema>;
