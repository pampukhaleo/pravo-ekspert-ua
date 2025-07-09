import React, { useEffect } from 'react'
import type { RouteRecord } from 'vite-react-ssg'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as HelmetPkg from 'react-helmet-async'
const { HelmetProvider } = HelmetPkg

import Index from './pages/Index'
import ExpertisesListPage from './pages/ExpertisesListPage'
// ExpertisePage will be lazy-loaded for SSG
// export { default as ExpertisePage } from './pages/ExpertisePage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import NewsArticlePage from './pages/NewsArticlePage'
import ServicePage from './pages/ServicePage'
import NotFound from './pages/NotFound'

// ScrollToTop component to ensure pages start at the top
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const queryClient = new QueryClient()

/**
 * Root layout wrapping all pages with providers
 */
const RootLayout: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Outlet />
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
)

const expertiseSlugs = [
  'budivelno-tekhnichna-ekspertyza',
  'zemelno-tekhnichna-ekspertyza',
  'elektrotekhnichna-ekspertyza',
  'ekonomichna-ekspertyza',
  'kompleksna-pozhezhna-ta-elektrotekhnichna-ekspertyza',
  'avtotekhnichna-ekspertyza',
  'avtotovaroznavcha-ekspertyza',
  'trasolohichna-ekspertyza',
  'ekolohichna-ekspertyza',
  'tovaroznavcha-ekspertyza',
  'kompiuterno-tekhnichna-ekspertyza',
  'psykholohichna-ekspertyza',
  'semantyko-tekstualna-ekspertyza',
  'pocherkoznavcha-ekspertyza',
  'ekspertyza-intelektualnoi-vlasnosti',
  'mystetvoznavcha-ekspertyza',
  'naukovo-pravova-ekspertyza',
]

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, Component: Index },
      { path: 'ekspertyzy', Component: ExpertisesListPage },
      {
        path: 'ekspertyzy/:slug',
        lazy: () => import('./pages/ExpertisePage'),
      },
      { path: 'posluhy/:slug', Component: ServicePage },
      { path: 'tsiny', Component: PricingPage },
      { path: 'kontakty', Component: ContactPage },
      { path: 'pro-nas', Component: AboutPage },
      { path: 'novini', Component: NewsPage },
      { path: 'novini/:slug', Component: NewsArticlePage },
      { path: '*', Component: NotFound },
    ],
  },
]

export default RootLayout
