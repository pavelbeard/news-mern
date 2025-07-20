import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["api/**/*"],
  clean: true,
  target: "node22",
  format: ["cjs"],
  ...options,
}));
