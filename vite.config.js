// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Samkaran-frontend/", // 🚨 Important: Match your repo name exactly
  plugins: [react()],
});
