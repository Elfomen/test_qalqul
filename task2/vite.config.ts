import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3002,
    strictPort: true,
  },
  server: {
    port: 3002,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3002",
  },
});
