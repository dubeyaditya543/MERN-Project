import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import { env } from "./config/env";
import app from "./app";

async function startServer(){
  await connectDB()

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`)
  })
}

startServer()