import * as newsQueries from "@/lib/db/queries/news.queries";
import { AppError } from "@/lib/utils/appError";
import type { NextFunction, Request, Response } from "express";
import type {
  NewsArchiveSchemaType,
  NewsCreateSchemaType,
  NewsDeleteSchemaType,
  NewsReadSchemaType,
  NewsUpdateSchemaType,
} from "./news.schema";

export type NewsCreateRequest = Request<
  unknown,
  unknown,
  NewsCreateSchemaType["body"]
>;

export type NewsReadRequest = Request<
  NewsReadSchemaType["params"],
  unknown,
  unknown
>;

export type NewsUpdateRequest = Request<
  NewsUpdateSchemaType["params"],
  unknown,
  NewsUpdateSchemaType["body"]
>;

export type NewsArchiveRequest = Request<
  NewsArchiveSchemaType["params"],
  unknown,
  NewsArchiveSchemaType["body"]
>;

export type NewsDeleteRequest = Request<
  NewsDeleteSchemaType["params"],
  unknown,
  unknown
>;

export class NewsController {
  static async saveNews(
    req: NewsCreateRequest,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;

    if (!body) {
      return next(new AppError("BAD_REQUEST", "There is no body."));
    }

    if (await newsQueries.getNewsByTitle(body.title)) {
      return next(
        new AppError(
          "BAD_REQUEST",
          "The article with that title already exists."
        )
      );
    }

    const news = await newsQueries.saveNews(body);

    res.status(201).json({ object: news });
  }

  static async getAllNews(req: Request, res: Response, _: NextFunction) {
    const news = await newsQueries.getAllNews();
    res.status(200).json({
      objects: news,
    });
  }

  static async getNewsById(
    req: NewsReadRequest,
    res: Response,
    next: NextFunction
  ) {
    const { _id } = req.params;

    const news = await newsQueries.getNewsById(_id);

    if (!news) {
      return next(new AppError("NOT_FOUND", "News not found."));
    }

    res.status(200).json({
      object: news,
    });
  }

  static async getLastNews(
    req: NewsReadRequest,
    res: Response,
    next: NextFunction
  ) {
    const lastNews = await newsQueries.getLastNews();

    if (!lastNews) {
      return next(new AppError("NOT_FOUND", "News not found."));
    }

    res.status(200).json({
      object: lastNews,
    });
  }

  static async updateNews(
    req: NewsUpdateRequest,
    res: Response,
    next: NextFunction
  ) {
    const {
      body,
      params: { _id },
    } = req;

    if (!body) {
      return next(new AppError("BAD_REQUEST", "There is no body."));
    }

    const updatedNews = await newsQueries.updateNewsById(_id as string, body);

    if (!updatedNews) {
      return next(
        new AppError(
          "NOT_FOUND",
          "News didn't updated, because it doesn't exist."
        )
      );
    }

    res.status(200).json({
      object: { ...updatedNews },
    });
  }

  static async archiveNews(
    req: NewsArchiveRequest,
    res: Response,
    next: NextFunction
  ) {
    const {
      body,
      params: { _id },
    } = req;

    if (!body) {
      return next(new AppError("BAD_REQUEST", "There is no body."));
    }

    if (!body?.archiveDate) {
      return next(new AppError("BAD_REQUEST", "There is no <archiveDate>."));
    }

    const updatedNews = await newsQueries.setNewsArchived(
      _id as string,
      body.archiveDate
    );

    if (!updatedNews) {
      return next(
        new AppError(
          "NOT_FOUND",
          "News didn't updated, because it doesn't exist."
        )
      );
    }

    res.status(200).json({
      object: { ...updatedNews },
    });
  }

  static async deleteNews(
    req: NewsDeleteRequest,
    res: Response,
    _: NextFunction
  ) {
    const {
      params: { _id },
    } = req;

    await newsQueries.deleteNews(_id);

    res.status(204);
  }
}
