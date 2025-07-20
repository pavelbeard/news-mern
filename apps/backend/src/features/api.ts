import { Router } from "express";
import { API_V1 } from "../lib/constants";
import { healthRouter } from "./health";
import { newsRouter } from "./news/news.router";

const router: Router = Router();

router.use(API_V1, [newsRouter, healthRouter]);

export default router;
