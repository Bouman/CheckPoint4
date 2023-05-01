const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // utilisez "[name]" pour inclure le nom du point d'entrée dans le nom du fichier
        entryFileNames: '[name].js',
        chunkFileNames: 'imports/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
});
