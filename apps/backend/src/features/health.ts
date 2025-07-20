import Router from "express";

export const healthRouter = Router();

healthRouter.get("/health", (_, res) => {
  return res.json({ ok: { message: "router is healthy" } });
});
