import reactSWC from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const folders = {
  staff: ["node_modules", "dist"],
  ui: ["./tests/ui/**/*.test.{ts,tsx}"],
};

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
          include: folders.ui,
          exclude: folders.staff,
          setupFiles: ["./tests/ui/setupUiTests.ts"],
          alias: {
            news_queries: "./src/lib/api/queries/news.queries.ts",
          },
        },
      },
    ],
  },
});
