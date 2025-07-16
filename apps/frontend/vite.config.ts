import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import oxlintPlugin from "vite-plugin-oxlint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), oxlintPlugin()],
});
