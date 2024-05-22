// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", '@vueuse/nuxt', '@pinia/nuxt'],
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})