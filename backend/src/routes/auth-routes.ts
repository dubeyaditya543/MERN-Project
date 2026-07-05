import { Router } from "express";
import { login, logout, register } from "../controllers/auth-controller";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validations/auth-validation";

const router = Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/logut", logout)

export default router