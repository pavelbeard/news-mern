import reactSWC from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [reactSWC(), viteTsconfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "ui",
          globals: true,
          environment: "jsdom",
          include: ["./src/tests/ui/**/*.test.{ts,tsx}"],
          exclude: ["node_modules", "dist"],
          setupFiles: ["./src/tests/ui/setupUiTests.ts"],
          alias: {
            news_queries: "./src/lib/api/queries/news.queries.ts",
          },
        },
      },
    ],
  },
});
