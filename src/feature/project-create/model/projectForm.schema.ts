import z from 'zod';

export const ProjectFormSchema = z.object({
  projectId: z.number().optional(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  isDraft: z.boolean().optional(),
  description: z.string(),
  fileIds: z.array(z.number()),
  participantIds: z.array(z.number()),
}).superRefine((data, ctx) => {
  if (!data.isDraft) {
    if (data.description.length < 300) {
      ctx.addIssue({
        code: 'custom',
        message: '최소 300자 이상 입력해주세요',
        path: ['description'],
      });
    }
    if (data.description.length > 2000) {
      ctx.addIssue({
        code: 'custom',
        message: '최대 2000자 이하 입력해주세요',
        path: ['description'],
      });
    }
    if (data.fileIds.length < 1) {
      ctx.addIssue({
        code: 'custom',
        message: '최소 1개의 파일을 첨부해주세요',
        path: ['fileIds'],
      });
    }
    if (data.participantIds.length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: '프로젝트 참여 팀원을 선택해주세요.',
        path: ['participantIds'],
      });
    }
  }
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
