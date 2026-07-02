import mongoose from "mongoose"
import {env} from "./env"
import {logger} from "../utils/logger"

export async function connectDB(): Promise<void>{
  try{
    await mongoose.connect(env.MONGODB_URI)
    logger.info("Mongodb connected successfully")
  } catch (err) {
    logger.error(err instanceof Error ? err : { err }, "Could not connect to db")
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  logger.warn("mongodb discconnected")
})

mongoose.connection.on("error", (error) => {
  logger.error("mongodb connection error", error)
})