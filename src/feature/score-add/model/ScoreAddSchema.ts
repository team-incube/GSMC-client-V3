import { z } from 'zod';

export const ScoreAddSchema = z
  .object({
    categoryType: z.string(),
    value: z.union([z.string(), z.number()]),
    fileId: z.number().nullable(),
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

export type ScoreAddFormValueType = z.infer<typeof ScoreAddSchema>;
