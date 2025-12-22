import z from 'zod';

export const ProjectFormSchema = z.object({
  projectId: z.number().optional(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  description: z.string().min(300, '최소 300자 이상 입력해주세요').max(2000, '최대 2000자 이하 입력해주세요'),
  fileIds: z.array(z.number()).min(1, "최소 1개의 파일을 첨부해주세요"),
  participantIds: z.array(z.number()).nonempty('프로젝트 참여 팀원을 선택해주세요.'),
  isDraft: z.boolean().optional(),
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
