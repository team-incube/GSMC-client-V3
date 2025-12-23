import z from 'zod';

export const SignupSchema = z.object({
  name: z.string().regex(/^[가-힣]{2,10}$/, '이름은 2~10자의 한글만 입력 가능합니다.'),
  studentNumber: z
    .number('학번은 숫자여야 합니다.')
    .int()
    .min(1101, '학번은 1101 이상이어야 합니다.')
    .max(3418, '학번은 3418 이하이어야 합니다.'),
});

export type SignupFormType = z.infer<typeof SignupSchema>;
