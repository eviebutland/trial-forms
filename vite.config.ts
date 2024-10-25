import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgrPlugin from "vite-plugin-svgr";

// see all documentation here https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build change as your need
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});
