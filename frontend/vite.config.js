import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // ⭐ 백엔드 포트
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
