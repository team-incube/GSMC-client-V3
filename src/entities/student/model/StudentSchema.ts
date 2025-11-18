import z from 'zod';

export const RoleEnum = z.enum(['UNAUTHORIZED', 'STUDENT', 'TEACHER', 'ROOT']);

export const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  grade: z.number(),
  class: z.number(),
  number: z.number(),
  role: RoleEnum,
});

export const StudentResponse = z.object({
  data: StudentSchema,
});

export type StudentType = z.infer<typeof StudentSchema>;
export type StudentResponseType = z.infer<typeof StudentResponse>;
export type RoleType = z.infer<typeof RoleEnum>;
