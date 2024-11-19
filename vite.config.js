import { defineConfig } from "vite";
import { coverageConfigDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
    postcss: {
      options: {
        exclude: /node_modules/,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        "./postcss.config.js",
        "./src/App.jsx",
        "./src/main.jsx",
      ],
    },
  },
});
