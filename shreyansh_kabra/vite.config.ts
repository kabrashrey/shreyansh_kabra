import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// When deploying to a custom domain (shreyanshkabra.com), set base to '/'.
// For GitHub Pages (kabrashrey.github.io/shreyansh_kabra/), keep the subpath.
const useCustomDomain = process.env.VITE_CUSTOM_DOMAIN === "true";

export default defineConfig({
  plugins: [react()],
  base: useCustomDomain ? "/" : "/shreyansh_kabra/",
});
