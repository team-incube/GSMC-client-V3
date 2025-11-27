import z from 'zod';

export const EvidenceFormSchema = z.object({
  projectId: z.number().optional(),
  evidenceId: z.number().optional(),
  scoreId: z.number().optional(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  fileIds: z.array(z.number()).default([]),
});

export const EvideceRequestSchema = EvidenceFormSchema.pick({
  scoreId: true,
  title: true,
  content: true,
  fileIds: true,
});

export type EvidenceFormValues = z.infer<typeof EvidenceFormSchema>;
export type EvideceRequestType = z.infer<typeof EvideceRequestSchema>;
