import cors from "cors";
import express, { json } from "express";
import router from "../src/features/api";
import { PORT } from "../src/lib/constants";
import { client } from "../src/lib/db/client";
import { ALLOWED_ORIGINS } from "../src/lib/settings";
import {
  errorFallbackMiddleware,
  logger,
  originResolver,
} from "../src/lib/utils/middlewares";

const app = express();

app
  .disable("x-powered-by")
  .use(json())
  .use(
    cors({
      credentials: true,
      origin: (origin, callback) =>
        originResolver(ALLOWED_ORIGINS, origin, callback),
    })
  )
  .use(logger)
  .get("/health", (_, res) => {
    return res.json({ ok: { message: "root API is healthy" } });
  });

client()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Failed to connect to database. ", err));

app.use(router);

app.use(errorFallbackMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
