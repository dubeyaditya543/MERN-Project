import {z} from "zod"
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI IS REQUIRED"),
  JWT_SECRET: z.string().min(32, "JWT SECRET MUST BE AT LEAST 32 CHARS LONG"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT REFRESH SECRET MUST BE AT LEAST 32 CHARS LONG"),
  CLIENT_URL: z.url()
})

const parsed = envSchema.safeParse(process.env)

if(!parsed.success){
  console.log("Invalid env variables")
  console.error(parsed.error.message);
  process.exit(1)
}

export const env = parsed.data