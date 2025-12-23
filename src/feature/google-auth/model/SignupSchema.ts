import z from 'zod';

export const SignupSchema = z.object({
  name: z.string().regex(/^[가-힣]{2,10}$/, '이름은 2~10자의 한글만 입력 가능합니다.'),
  studentNumber: z
    .number('학번은 숫자여야 합니다.')
    .int()
    .refine((val) => {
      const grade = Math.floor(val / 1000);
      const classNum = val % 1000;
      return grade >= 1 && grade <= 3 && classNum >= 101 && classNum <= 418;
    }, '학번은 1101~1418, 2101~2418, 3101~3418 범위여야 합니다.'),
});

export type SignupFormType = z.infer<typeof SignupSchema>;
