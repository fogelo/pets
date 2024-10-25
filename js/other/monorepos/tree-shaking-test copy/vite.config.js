import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "./public",
  plugins: [react()],
  server: {
    port: 3000, // Вы можете изменить порт, если требуется
  },
  build: {
    outDir: "../build", // Папка для сборки
  },
});
