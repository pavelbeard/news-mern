import { client } from "./client";
import { News } from "./models/news.models";

async function main() {
  await client(
    process.env.MONGODB_URL ??
      "mongodb://admin:admin@localhost:27018/?authSource=admin"
  ).catch(() => console.error("Error while connecting to database."));

  console.log("Connected to database.");

  console.log("Collection <News> dropping...");
  try {
    News.collection.drop();
    console.log("Collection <News> dropped");
  } catch (e) {
    console.log(e);
  }
}

main()
  .then()
  .catch(() => {
    console.log("Error while dropping database");
    process.exit();
  });
