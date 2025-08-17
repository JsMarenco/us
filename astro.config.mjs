// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercelStatic from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercelStatic({
    webAnalytics: {
      enabled: false,
    },
    maxDuration: 8,
  }),
});
