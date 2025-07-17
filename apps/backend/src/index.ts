import { PORT } from "@/lib/constants";
import cookieParser from "cookie-parser";
import express from "express";
import router from "./features/api";
import { client } from "./lib/db/client";
import { errorFallbackMiddleware } from "./lib/utils/middlewares";

const app = express();

// third party
app.use([express.json(), cookieParser()]);

client()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Failed to connect to database. ", err));

app.use(router);

app.use(errorFallbackMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
