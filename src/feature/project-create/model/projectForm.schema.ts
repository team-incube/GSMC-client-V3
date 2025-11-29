import z from 'zod';

export const ProjectFormSchema = z.object({
  projectId: z.number().optional(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  fileIds: z.array(z.number()).default([]),
  participantIds: z.array(z.number()).nonempty('프로젝트 참여 팀원을 선택해주세요.'),
  isDraft: z.boolean().optional(),
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
