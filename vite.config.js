import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VitePWA({
    manifest: {
      name: "Gym stats",
      short_name: "Gym stats | Crea, personaliza y comparte tus rutinas",
      start_url: "/",
      display: "standalone",
      background_color: "#10283d",
      theme_color: "#1a252f",
      icons : [
        {
          src: "./logo.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }
  })],
  define: {
    'global': {}
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/scss/_variables.scss";
        `
      }
    }
  }
})

