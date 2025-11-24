import z from 'zod';

export const ParticipationProjectSchema = z.object({
  projectId: z.number(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  fileIds: z.array(z.number()).optional().nullable(),
});

export type ParticipationProjectFormValueType = z.infer<typeof ParticipationProjectSchema>;
