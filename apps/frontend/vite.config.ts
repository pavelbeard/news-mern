import tailwindcss from "@tailwindcss/vite";
import { vercelPreset } from "@vercel/react-router/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import oxlintPlugin from "vite-plugin-oxlint";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    oxlintPlugin(),
    tailwindcss(),
    viteTsconfigPaths(),
    vercelPreset(),
  ],
});
