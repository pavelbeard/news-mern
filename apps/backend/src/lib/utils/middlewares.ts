import { NextFunction, Request, type Response } from "express";
import { ZodError, type ZodObject } from "zod";
import { StaticOrigin } from "../../types";
import { AppError } from "./appError";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const time = new Date().toISOString();
  console.log(
    `MIDDLEWARE: `,
    `[${time}]`,
    `[${req.method}]:`,
    `$host=${req.hostname}`,
    `$path=${req.path}`
  );
  next();
};

export const originResolver = (
  allowedOrigins: string[],
  origin: string | undefined,
  callback: (err: AppError | Error | null, origin?: StaticOrigin) => void
) => {
  console.log(`Resolving origin: ${origin}`);

  if (allowedOrigins.includes(origin as string)) {
    return callback(null, origin);
  }

  return callback(new AppError("FORBIDDEN", "Not allowed by CORS!"));
};

export const errorFallbackMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  console.error(err.name);
  res
    .status(
      "statusCode" in err
        ? (err.statusCode as number)
        : err.name === "CastError"
          ? 404
          : 500
    )
    .json({
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
            `Invalid or missing input${issues.length > 1 ? "s" : ""} provided for: ${issues.join(", ")}`
          )
        );
      } else {
        console.error(e);
        return next(new AppError("BAD_REQUEST", "Invalid input"));
      }
    }
  };
