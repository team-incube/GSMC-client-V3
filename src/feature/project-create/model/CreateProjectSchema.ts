import z from 'zod';

export const CreateProjectSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  fileIds: z.array(z.number()).optional().nullable(),
  participantIds: z.array(z.number()).nonempty('프로젝트 참여 팀원을 선택해주세요.'),
});

export type CreateProjectFormValueType = z.infer<typeof CreateProjectSchema>;
