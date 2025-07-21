import dotenvx from "@dotenvx/dotenvx";
import { defineConfig } from "vitest/config";

dotenvx.config({ path: ".env.local" });

const folders = {
  unit: ["./src/**/*.test.ts"],
  integration: ["./tests/**/*.test.ts"],
};

export default defineConfig({
  test: {
    fileParallelism: false,
    projects: [
      {
        extends: true,
        test: {
          include: folders.unit,
          exclude: folders.integration,
          name: { label: "unit", color: "red" },
          alias: {
            queries: "/src/lib/db/queries",
          },
          env: { ...process.env },
        },
      },
      {
        extends: true,
        test: {
          poolOptions: {
            threads: {
              singleThread: true,
            },
          },
          include: folders.integration,
          exclude: folders.unit,
          name: { label: "integration", color: "blue" },
          alias: {
            news_controller: "/src/features/news/news.controller",
          },
          env: {
            MONGODB_URL: "mongodb://localhost:27019",
          },
        },
      },
    ],
  },
});
