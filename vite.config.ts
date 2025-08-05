import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Detect build mode
const isWidgetBuild = process.env.BUILD_WIDGET === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: isWidgetBuild
    ? {
        lib: {
          entry: path.resolve(__dirname, "src/embed.tsx"),
          name: "ChatWidget",
          fileName: "my-widget",
          formats: ["umd"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
        outDir: "dist",
        emptyOutDir: true,
      }
    : undefined, // use normal Vite config for dev
});
