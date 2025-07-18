import { schemaValidationMiddleware } from "@/lib/utils/middlewares";
import { Router } from "express";
import { NewsController } from "./news.controller";
import {
  newsArchiveSchema,
  newsCreateSchema,
  newsDeleteSchema,
  newsReadSchema,
  newsUpdateSchema,
} from "./news.schema";

const newsRouter: Router = Router();

newsRouter.post(
  "/news",
  schemaValidationMiddleware(newsCreateSchema),
  NewsController.saveNews
);

newsRouter.get("/news", NewsController.getAllNews);

newsRouter.get("/news-archive", NewsController.getAllArchiveNews);

newsRouter.get(
  "/news/:_id",
  schemaValidationMiddleware(newsReadSchema),
  NewsController.getNewsById
);

newsRouter.get("/news-last", NewsController.getLastNews);

newsRouter.put(
  "/news/:_id",
  schemaValidationMiddleware(newsUpdateSchema),
  NewsController.updateNews
);

newsRouter.patch(
  "/news/:_id",
  schemaValidationMiddleware(newsArchiveSchema),
  NewsController.archiveNews
);

newsRouter.delete(
  "/news/:_id",
  schemaValidationMiddleware(newsDeleteSchema),
  NewsController.deleteNews
);

export { newsRouter };
