import z from 'zod';

export const EvidenceFormSchema = z.object({
  projectId: z.number().optional(),
  evidenceId: z.number().optional(),
  scoreId: z.number().optional(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(300, '최소 300자 이상 입력해주세요').max(2000, '최대 2000자 이하 입력해주세요'),
  fileIds: z.array(z.number()).min(1, "최소 1개의 파일을 첨부해주세요"),
});

export const EvideceRequestSchema = EvidenceFormSchema.pick({
  scoreId: true,
  title: true,
  content: true,
  fileIds: true,
});

export type EvidenceFormValues = z.infer<typeof EvidenceFormSchema>;
export type EvidenceRequestSchema = z.infer<typeof EvideceRequestSchema>;
