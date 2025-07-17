import { Router } from "express";

const newsRouter: Router = Router();

newsRouter.post("/news", () => {});
newsRouter.get("/news", (req, res) => {
  res.status(200).json({ message: "Hi! I'm <news> router!" });
});
newsRouter.get("/news/:_id", () => {});
newsRouter.put("/news/:_id", () => {});
newsRouter.patch("/news/:_id", () => {});

export { newsRouter };
