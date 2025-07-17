import { saveNews } from "@/lib/db/queries/news.queries";
import { AppError } from "@/lib/utils/appError";
import type { NextFunction, Request, Response } from "express";
import { type NewsCreateSchemaType } from "./news.schema";

export class NewsController {
  static async saveNews(
    req: Request<unknown, unknown, NewsCreateSchemaType["body"]>,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;

    if (!body) {
      return next(new AppError("BAD_REQUEST", "There is not body."));
    }

    const news = saveNews(body);

    res.status(201).json({ object: news });
  }
}
