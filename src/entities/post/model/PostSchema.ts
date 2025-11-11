import { z } from 'zod'

export const FileSchema = z.object({
  fileOriginalName: z.string(),
  fileStoredName: z.string(),
  fileUri: z.string()
})

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createAt: z.string().transform((val) => new Date(val)),
  updateAt: z.string().transform((val) => new Date(val)),
  file: z.array(FileSchema)
})

export type FileType = z.infer<typeof FileSchema>
export type PostType = z.infer<typeof PostSchema>