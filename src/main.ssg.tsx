
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ViteSSG } from 'vite-ssg/single-page'

// SSG entry point
export const createApp = ViteSSG(
  App,
  ({ router, routes, isClient, initialState }) => {
    // Set up any additional configuration here if needed
  }
)

// Client-side hydration
if (typeof window !== 'undefined') {
  createRoot(document.getElementById("root")!).render(<App />);
}
