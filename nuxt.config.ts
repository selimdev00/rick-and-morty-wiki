import { createResolver } from "@nuxt/kit";
import { defineNuxtConfig } from "nuxt/config";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ["nuxt-primevue", "@nuxtjs/tailwindcss", "@nuxt/eslint"],

  primevue: {
    options: { unstyled: true },

    importPT: {
      from: resolve("./presets/aura"),
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  experimental: {
    asyncContext: true,
  },

  css: ["~/assets/global.css"],

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || "https://rickandmortyapi.com/api",
    },
  },
});
