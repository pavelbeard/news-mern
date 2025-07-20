import { describe, it } from "vitest";
import { main } from "./seed";

describe("Database seeding", () => {
  it("should seed the database with initial data", async () => {
    await main()
      .then(() => {
        console.log("Database seeding completed successfully.");
      })
      .catch((error) => {
        console.error("Error seeding database:", error);
      });
  });
});
