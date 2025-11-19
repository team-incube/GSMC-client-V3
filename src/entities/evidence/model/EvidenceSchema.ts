import z from 'zod';

export const EvidenceSchema = z.object({
  scoreId: z.number().min(1, 'scoreId가 누락되었습니다'),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  fileIds: z.array(z.number()).nonempty('파일첨부는 필수입니다'),
});
