import { PORT } from "@/lib/constants";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import router from "./features/api";
import { client } from "./lib/db/client";
import { ALLOWED_ORIGINS } from "./lib/settings";
import {
  errorFallbackMiddleware,
  originResolver,
} from "./lib/utils/middlewares";

const app = express();

// third party
app.use([
  express.json(),
  cookieParser(),
  cors({
    credentials: true,
    origin: (origin, callback) =>
      originResolver(ALLOWED_ORIGINS, origin, callback),
  }),
]);

client()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Failed to connect to database. ", err));

app.use(router);

app.use(errorFallbackMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
