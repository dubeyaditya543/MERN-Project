import { env } from "../config/env";
import { loginUser, registerUser } from "../services/auth-service";
import { catchAsync } from "../utils/catch-async";
import { Request, Response } from "express";

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await registerUser(req.body);

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

  res.status(201).json({
    success: true,
    data: { user, accessToken },
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser(email, password);

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

  res.status(200).json({
    success: true,
    data: { user, accessToken },
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS)

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  })
})
