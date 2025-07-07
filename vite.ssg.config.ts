
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

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
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    script: 'sync',
    formatting: 'minify',
    includedRoutes: [
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
    ],
  },
});
