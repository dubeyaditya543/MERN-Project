import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { logger } from "../utils/logger";
import { env } from "../config/env";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values((err as any).errors).map((e: any) => e.message),
    });
    return;
  }

  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
    return;
  }

  if ((err as any).code === 11000) {
    res.status(409).json({
      success: false,
      message: "Duplicate value - this record already exists",
    });
    return;
  }

  logger.error({err}, "Unexpected error")

  res.status(500).json({
    success: false,
    message: env.NODE_ENV === "production" ? "Something went wrong" : err.message
  })
}
