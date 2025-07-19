import { API_V1 } from "api/lib/constants";
import { Router } from "express";
import { newsRouter } from "./news/news.router";

const router: Router = Router();

router.use(API_V1, [newsRouter]);

export default router;
