import { NextFunction, Request, Response } from "express"
import { ZodError, ZodObject} from "zod"
import { ApiError } from "../utils/api-error"

export function validate(schema: ZodObject){
  return (req: Request, res: Response, next: NextFunction): void => {
    try{
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    }catch(error){
      if(error instanceof ZodError){
        const message = error.issues.map((e) => e.message).join(", ")
        return next(new ApiError(400, message))
      }
      next(error)
    }
  }
}