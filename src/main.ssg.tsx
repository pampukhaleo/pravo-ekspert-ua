
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ViteSSG } from 'vite-ssg/single-page'

// Define the routes that should be pre-rendered
const routes = [
  '/',
  '/ekspertyzy',
  '/kontakty',
  '/pro-nas',
  '/tsiny',
  '/novini',
  // Expertise routes
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

// SSG entry point
export const createApp = ViteSSG(
  App,
  ({ router, routes: viteRoutes, isClient, initialState }) => {
    // Configure SSG options here if needed
    console.log('SSG initialization', { isClient, routesDefined: !!viteRoutes });
  }
)

// Client-side hydration
if (typeof window !== 'undefined') {
  createRoot(document.getElementById("root")!).render(<App />);
}
