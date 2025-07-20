import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["api/**/*"],
  clean: true,
  format: "cjs",
  target: "node22",
  ...options,
}));
