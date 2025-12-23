import { z } from 'zod';

import { FileType } from '@/entities/file/model/file';

export const ScoreFormSchema = z
  .object({
    scoreId: z.number().optional(),
    categoryType: z.string().min(1, '카테고리 타입을 선택해주세요.'),
    value: z.string().min(1, '값을 입력해주세요.'),
    evidenceType: z.enum(['EVIDENCE', 'FILE', 'UNREQUIRED']),
    files: z.object({
      existing: z.array(z.custom<FileType>()),
      new: z.array(z.custom<File>()),
    }),
  })
  .superRefine((data, ctx) => {
    if (
      data.evidenceType === 'FILE' &&
      data.files.existing.length === 0 &&
      data.files.new.length === 0
    ) {
      ctx.addIssue({
        code: 'custom',
        message: '파일을 첨부해주세요.',
        path: ['files'],
      });
    }
  });

export type ScoreFormValues = z.infer<typeof ScoreFormSchema>;
