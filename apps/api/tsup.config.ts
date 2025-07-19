import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*"],
  clean: true,
  target: "node22",
  format: ["cjs"],
  ...options,
}));
