import dotenvx from "@dotenvx/dotenvx";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

dotenvx.config({ path: ".env.local" });

export default defineConfig({
  plugins: [viteTsconfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          include: ["**/*.test.ts"],
          name: { label: "unit", color: "red" },
          alias: {
            queries: "/api/lib/db/queries",
          },
          env: { ...process.env },
        },
      },
    ],
  },
});
