import { schemaValidationMiddleware } from "@/lib/utils/middlewares";
import { Router } from "express";
import { NewsController } from "./news.controller";
import {
  newsArchiveSchema,
  newsCreateSchema,
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

newsRouter.get(
  "/news/:_id",
  schemaValidationMiddleware(newsReadSchema),
  NewsController.getNewsById
);

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

export { newsRouter };
