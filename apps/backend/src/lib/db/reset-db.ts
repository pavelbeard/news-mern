import { client } from "./client";
import { News } from "./models/news.models";

export async function resetDb() {
  await client(process.env.MONGODB_URL ?? "mongodb://localhost:27018").catch(
    () => console.error("Error while connecting to database.")
  );

  console.log("Connected to database.");

  console.log("Collection <News> dropping...");
  try {
    News.collection.drop();
    console.log("Collection <News> dropped");
  } catch (e) {
    console.log(e);
  }
}

resetDb()
  .then()
  .catch(() => {
    console.log("Error while dropping database");
    process.exit();
  });
