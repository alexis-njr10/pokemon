import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern", // or "modern"
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 5173,
  },
});
