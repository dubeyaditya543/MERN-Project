import z from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(30),
    color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hex code")
  })
})

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(30).optional(),
    color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i).optional()
  }),
  params: z.object({
    id: z.string().min(1, "Category Id is required")
  })
})

export const categroyIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Category Id is required")
  })
})