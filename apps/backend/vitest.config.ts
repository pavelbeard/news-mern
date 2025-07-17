import viteTsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

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
            queries: "/src/lib/db/queries",
          },
        },
      },
    ],
  },
});
