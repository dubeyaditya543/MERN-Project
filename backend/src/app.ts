import express, { Application } from "express";
import helmet from "helmet"
import cors from "cors"
import { env } from "./config/env";
import compression from "compression";
import cookieParser from "cookie-parser";
import { notFoundHandler } from "./middlewares/not-found-handler";
import { errorHandler } from "./middlewares/error-handler";
import authRoutes from "./routes/auth-routes";
import categoryRoutes from "./routes/category-routes"
import noteRoutes from "./routes/note-routes"
import activityRoutes from "./routes/activity-routes"
import { protect } from "./middlewares/protect";
import { generalLimiter } from "./middlewares/rate-limiter";

const app: Application = express()

app.use(helmet())
app.use(cors({origin: env.CLIENT_URL, credentials: true}))
app.use(compression())
app.use(express.json({limit: "10kb"}))
app.use(cookieParser())
app.use(generalLimiter)

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/notes", noteRoutes)
app.use("/api/v1/activity", activityRoutes)
app.get("/api/v1/protected", protect, (req, res) => {
  res.status(200).json({
    success: true, message: "You are authenticated"
  })
})
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true, message: "Server is healthy"
  })
})

app.use(notFoundHandler)
app.use(errorHandler)

export default app