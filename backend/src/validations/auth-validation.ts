import z from "zod"

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be atleast 3 char long").max(50),
    email: z.email("Please provide a valid email"),
    password: z.string().min(8, "Password must be at least 8 char long")
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Please provide a valid email"),
    password: z.string().min(1, "Password is required")
  })
})