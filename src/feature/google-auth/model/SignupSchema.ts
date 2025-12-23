import z from 'zod';

export const SignupSchema = z.object({
  name: z.string().regex(/^[가-힣]{2,10}$/, '이름은 2~10자의 한글만 입력 가능합니다.'),
  studentNumber: z
    .number('학번은 숫자여야 합니다.')
    .int()
    .refine((val) => !isNaN(val) && val !== 0, '학번을 입력해주세요.')
    .refine((val) => val >= 1000 && val <= 9999, '학번은 4자리 숫자여야 합니다.'),
});

export type SignupFormType = z.infer<typeof SignupSchema>;
