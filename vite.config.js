import dotenv from 'dotenv';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url))

dotenv.config();
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  plugins: [react()],
  define: {
    'process.env': process.env
  }
});
