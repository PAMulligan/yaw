import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1337,
    watch: {
      usePolling: true,
    },
  },
  plugins: [svelte(), wfReload()],
  base: "./",
});
