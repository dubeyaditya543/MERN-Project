import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { verifyAccessToken } from "../utils/jwt";

export function protect(req: Request, res: Response, next: NextFunction): void{
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return next(new ApiError(401, "You are not logged in. Please log in to continue."))
  }

  const token = authHeader.split(" ")[1]

  try{
    const payload = verifyAccessToken(token);
    req.userId = payload.userId
    next()
  }catch(error){
    return next(new ApiError(401, "Invalid or expired token. Please log in again."))
  }
}