import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Автоматически откроет визуализацию в браузере после сборки
      filename: "stats.html", // Название файла с визуализацией
      gzipSize: true, // Показать размер после gzip-сжатия
      brotliSize: true, // Показать размер после brotli-сжатия
    }),
  ],
  server: {
    port: 3000, // Вы можете изменить порт, если требуется
  },
  build: {
    outDir: "../build", // Папка для сборки
    rollupOptions: {
      plugins: [visualizer()], // Добавьте плагин в Rollup
    },
  },
});
