import { NextFunction, Request, type Response } from "express";
import { ZodError, type ZodObject } from "zod";
import { AppError } from "./appError";

export const errorFallbackMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  console.error(err.stack);
  res.status("statusCode" in err ? (err.statusCode as number) : 500).json({
    message: err instanceof AppError ? err.message : "Internal Server Error",
  });
};

export const schemaValidationMiddleware =
  (schema: ZodObject) =>
  async (req: Request<unknown>, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e) {
      if (e instanceof ZodError) {
        const issues = e.issues.map((issue) => issue.path.pop());
        next(
          new AppError(
            "BAD_REQUEST",
            `Invalid or missing input ${issues.length > 1 ? "s" : ""} 
              provided for: ${issues.join(", ")}
            `
          )
        );
      } else {
        return next(new AppError("BAD_REQUEST", "Invalid input"));
      }
    }
  };
