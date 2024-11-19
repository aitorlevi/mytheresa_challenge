import { defineConfig } from "vite";
import { coverageConfigDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";

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
      plugins: [autoprefixer({})],
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
        "./src/App.jsx",
        "./src/main.jsx",
      ],
    },
  },
});
