import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'src', 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    VitePWA({
      devOptions: {
        enabled: true,
        type: 'module'
      },
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: '/',
      filename: 'sw.js',
      injectManifest: {
        swSrc: 'src/sw.js'
      },
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-96x96.png',
        'favicon-196x196.png',
        'favicon-512x512.png',
        'images/icons/plus.png', // pastikan file ini ada
        'images/icons/info.png' // pastikan file ini ada
      ],
      manifest: {
        id: '/index.html',
        name: 'String Story',
        short_name: 'Story',
        description: 'With String Story you can store all of your story, anytime, and anywhere you go! This app is made by Febry Billiyagi, you can see at github @billiyagi',
        start_url: '/index.html',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: 'favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'favicon-196x196.png',
            sizes: '196x196',
            type: 'image/png'
          },
          {
            src: 'favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        // Shortcut untuk tambah data
        shortcuts: [
          {
            name: 'Tambah Cerita Baru',
            short_name: 'Tambah',
            description: 'Buka halaman untuk menambahkan cerita baru',
            url: '/#/create-story',
            icons: [{ src: 'images/icons/plus.png', sizes: '96x96', type: 'image/png' }]
          },
          {
            name: 'About Developer',
            short_name: 'About',
            description: 'Halaman tentang pengembang aplikasi String Story',
            url: '/#/about',
            icons: [{ src: 'images/icons/info.png', sizes: '96x96', type: 'image/png' }]
          }
        ],
        // Screenshot aplikasi
        screenshots: [
          {
            src: 'images/screenshots/string-story-pc.png',
            sizes: '1440x900',
            type: 'image/png',
            label: 'Tampilan Desktop Home',
            form_factor: 'wide'
          },
          {
            src: 'images/screenshots/string-story-pc-create-story.png',
            sizes: '1440x900',
            type: 'image/png',
            label: 'Tampilan Desktop New Story',
            form_factor: 'wide'
          },
          {
            src: 'images/screenshots/string-story-mobile-create-story.png',
            sizes: '360x640',
            type: 'image/png',
            label: 'Tampilan Mobile New Story',
            form_factor: 'narrow'
          },
          {
            src: 'images/screenshots/string-story-mobile.png',
            sizes: '360x640',
            type: 'image/png',
            label: 'Tampilan Mobile Home',
            form_factor: 'narrow'
          }
        ]
      },
    })
  ]
});
