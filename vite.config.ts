
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImagemin from "vite-plugin-imagemin";
import { ssgBuild } from 'vite-plugin-ssg';

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      webp: {
        quality: 75,
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    script: 'sync',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    includedRoutes(paths: string[]) {
      // Define all your routes that should be pre-rendered
      return [
        '/',
        '/ekspertyzy',
        '/kontakty',
        '/pro-nas',
        '/tsiny',
        '/novini',
        // Add all your expertise routes
        '/ekspertyzy/budivelno-tekhnichna-ekspertyza',
        '/ekspertyzy/zemelno-tekhnichna-ekspertyza',
        '/ekspertyzy/elektrotekhnichna-ekspertyza',
        '/ekspertyzy/ekonomichna-ekspertyza',
        '/ekspertyzy/kompleksna-pozhezhna-ta-elektrotekhnichna-ekspertyza',
        '/ekspertyzy/avtotekhnichna-ekspertyza',
        '/ekspertyzy/avtotovaroznavcha-ekspertyza',
        '/ekspertyzy/trasolohichna-ekspertyza',
        '/ekspertyzy/ekolohichna-ekspertyza',
        '/ekspertyzy/tovaroznavcha-ekspertyza',
        '/ekspertyzy/kompiuterno-tekhnichna-ekspertyza',
        '/ekspertyzy/psykholohichna-ekspertyza',
        '/ekspertyzy/semantyko-tekstualna-ekspertyza',
        '/ekspertyzy/pocherkoznavcha-ekspertyza',
        '/ekspertyzy/ekspertyza-intelektualnoi-vlasnosti',
        '/ekspertyzy/mystetvoznavcha-ekspertyza',
        '/ekspertyzy/naukovo-pravova-ekspertyza',
      ];
    },
  },
}));
