import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/auth-controller";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validations/auth-validation";
import { authLimiter } from "../middlewares/rate-limiter";

const router = Router()

router.post("/register", authLimiter, validate(registerSchema), register)
router.post("/login", authLimiter, validate(loginSchema), login)
router.post("/logut", logout)
router.post("/refresh", authLimiter, refresh)

export default router