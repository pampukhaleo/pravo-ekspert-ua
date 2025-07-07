
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// SSG entry point
export function createApp() {
  return <App />
}

// Client-side hydration
if (typeof window !== 'undefined') {
  createRoot(document.getElementById("root")!).render(<App />);
}
