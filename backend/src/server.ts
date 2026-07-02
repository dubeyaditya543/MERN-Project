import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import { env } from "./config/env";

connectDB().then(() => {
  logger.info(`Config loaded, running in ${env.NODE_ENV} mode`)
})