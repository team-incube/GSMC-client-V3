import z from 'zod';

export const SignupSchema = z.object({
  name: z.string().regex(/^[가-힣]{2,10}$/, '이름은 2~10자의 한글만 입력 가능합니다.'),
  studentNumber: z
    .number('학번은 숫자여야 합니다.')
    .int()
    .refine((val) => {
      const grade = Math.floor(val / 1000);
      const classNum = Math.floor((val % 1000) / 100);
      const studentNum = val % 100;
      return grade >= 1 && grade <= 3 && classNum >= 1 && classNum <= 4 && studentNum >= 1 && studentNum <= 18;
    }, '유효하지 않은 학번입니다.'),
});

export type SignupFormType = z.infer<typeof SignupSchema>;
