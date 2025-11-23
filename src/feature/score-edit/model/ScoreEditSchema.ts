import z from 'zod';

export const ScoreEditSchema = z.object({
  categoryType: z.string().lowercase(),
  evidenceType: z.enum(['EVIDENCE', 'FILE', 'UNREQUIRED']),
  evidenceId: z.number(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  fileIds: z.array(z.number()).nullable(),
  value: z.union([z.string(), z.number()]),
  fileId: z.number().nullable(),
});

export const EvidenceFormSchema = ScoreEditSchema.pick({
  evidenceId: true,
  title: true,
  content: true,
  fileIds: true,
});

export const ScoreFormSchema = ScoreEditSchema.pick({
  categoryType: true,
  value: true,
  fileId: true,
  evidenceType: true,
}).refine(
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

export type ScoreEditFormValueType = z.infer<typeof ScoreEditSchema>;

export type EvidenceFormValueType = z.infer<typeof EvidenceFormSchema>;

export type ScoreFormValueType = z.infer<typeof ScoreFormSchema>;
