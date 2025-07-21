import { describe, it } from "vitest";
import { seedDb } from "./seed";

describe("Database seeding", () => {
  it("should seed the database with initial data", async () => {
    await seedDb()
      .then(() => {
        console.log("Database seeding completed successfully.");
      })
      .catch((error) => {
        console.error("Error seeding database:", error);
      });
  });
});
