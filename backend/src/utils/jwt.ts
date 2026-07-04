import jwt, {SignOptions} from "jsonwebtoken"
import { env } from "../config/env"

export interface ITokenPayload {
  userId: string
}

export function generateAccessToken(payload: ITokenPayload): string{
  const options: SignOptions = {expiresIn: "15min"}
  return jwt.sign(payload, env.JWT_SECRET, options)
}

export function generateRefreshToken(payload: ITokenPayload): string{
  const options: SignOptions = {expiresIn: "7d"}
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options)
}

export function verifyAccessToken(token: string): ITokenPayload{
  return jwt.verify(token, env.JWT_SECRET) as ITokenPayload
}

export function verifyRefreshToken(token: string): ITokenPayload{
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as ITokenPayload
}