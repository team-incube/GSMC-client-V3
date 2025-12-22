import z from 'zod';

export const EvidenceFormSchema = z.object({
  projectId: z.number().optional(),
  evidenceId: z.number().optional(),
  scoreId: z.number().optional(),
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

export const EvideceRequestSchema = EvidenceFormSchema.pick({
  scoreId: true,
  title: true,
  content: true,
  fileIds: true,
});

export type EvidenceFormValues = z.infer<typeof EvidenceFormSchema>;
export type EvidenceRequestSchema = z.infer<typeof EvideceRequestSchema>;
