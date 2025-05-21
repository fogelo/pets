import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // все /api/* -> http://localhost/api/*
      "/api": {
        target: "http://localhost/hometask_09/api",
        changeOrigin: true,
        secure: false,
        // ws: true,
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
