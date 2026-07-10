import z from "zod";

const hexColor = z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hex code");

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is requrired").max(150),
    content: z.string().min(1, "Content is required"),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    color: hexColor.optional()
  })
})

export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(150).optional(),
    content: z.string().min(1).optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    color: hexColor.optional()
  }),
  params: z.object({
    id: z.string().min(1, "Note id is required")
  })
})

export const noteIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
})