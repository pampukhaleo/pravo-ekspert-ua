
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ssgBuild } from 'vite-plugin-ssg';

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [
    react(),
    ssgBuild({
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
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
