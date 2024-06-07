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

  app: {
    head: {
      title: "Rick And Morty Wiki | Confidential",
      charset: "utf-8",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "57x57",
          href: "/apple-touch-icon-57x57.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "60x60",
          href: "/apple-touch-icon-60x60.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "72x72",
          href: "/apple-touch-icon-72x72.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "76x76",
          href: "/apple-touch-icon-76x76.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "114x114",
          href: "/apple-touch-icon-114x114.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          href: "/apple-touch-icon-120x120.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "144x144",
          href: "/apple-touch-icon-144x144.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/apple-touch-icon-152x152.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon-180x180.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-icon-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
      ],
      meta: [
        {
          name: "msapplication-TileColor",
          content: "#ffffff",
        },
        {
          name: "msapplication-TileImage",
          content: "/ms-icon-144x144.png",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || "https://rickandmortyapi.com/api",
    },
  },
});
