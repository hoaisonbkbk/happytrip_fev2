// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss'
    , '@pinia/nuxt'
    , 'pinia-plugin-persistedstate/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: 'https://sysdev.happytrip.vn/api',
      
    },
  },

  css: [
    //'bootstrap/dist/css/bootstrap.min.css'
  ]
  

})