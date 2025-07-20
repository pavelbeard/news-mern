import { Router } from "express";
import { API_V1 } from "src/lib/constants";
import { newsRouter } from "./news/news.router";

const router: Router = Router();

router.use(API_V1, [newsRouter]);

export default router;
