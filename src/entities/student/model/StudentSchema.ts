import z from 'zod';

export const RoleEnum = z.enum(['UNAUTHORIZED', 'STUDENT', 'TEACHER', 'ROOT']);

export const StudentSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  grade: z.number(),
  classNumber: z.number(),
  number: z.number(),
  role: RoleEnum,
});

export type StudentType = z.infer<typeof StudentSchema>;
export type RoleType = z.infer<typeof RoleEnum>;
