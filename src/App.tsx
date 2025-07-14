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
import { Component as ExpertisePage, getStaticPaths as getExpertiseStaticPaths } from './pages/ExpertisePage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import NewsArticlePage from './pages/NewsArticlePage'
import ServicePage from './pages/ServicePage'
import NotFound from './pages/NotFound'

// ScrollToTop component to reset scroll on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
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

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: RootLayout,
    entry: 'src/App.tsx',
    children: [
      { index: true, Component: Index, entry: 'src/pages/Index.tsx' },
      { path: 'ekspertyzy', Component: ExpertisesListPage, entry: 'src/pages/ExpertisesListPage.tsx' },
      {
        path: 'ekspertyzy/:slug',
        Component: ExpertisePage,
        getStaticPaths: getExpertiseStaticPaths,
        entry: 'src/pages/ExpertisePage.tsx',
      },
      { path: 'posluhy/:slug', Component: ServicePage, entry: 'src/pages/ServicePage.tsx' },
      { path: 'tsiny', Component: PricingPage, entry: 'src/pages/PricingPage.tsx' },
      { path: 'kontakty', Component: ContactPage, entry: 'src/pages/ContactPage.tsx' },
      { path: 'pro-nas', Component: AboutPage, entry: 'src/pages/AboutPage.tsx' },
      { path: 'novini', Component: NewsPage, entry: 'src/pages/NewsPage.tsx' },
      { path: 'novini/:slug', Component: NewsArticlePage, entry: 'src/pages/NewsArticlePage.tsx' },
      { path: '*', Component: NotFound, entry: 'src/pages/NotFound.tsx' },
    ],
  },
]

export default RootLayout
