import z from "zod";

export const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  grade: z.number(),
  class: z.number(),
  number: z.number(),
  role: z.string()  
})

export type StudentType = z.infer<typeof StudentSchema>