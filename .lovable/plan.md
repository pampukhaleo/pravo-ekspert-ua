## Проблема

`<Helmet>` из `react-helmet-async` требует `HelmetProvider` в дереве React. В текущей `src/App.tsx` его нет. `vite-react-ssg` оборачивает свой провайдер только на этапе SSG-билда — поэтому статический HTML корректный, но в браузере (dev-превью Lovable и после гидрации) провайдера нет → падает `context.helmet.instances.add`, и приложение уходит в client-only rendering с "Unexpected Application Error".

## Фикс

**`src/App.tsx`**: обернуть `RootLayout` в `HelmetProvider` из `react-helmet-async`.

```tsx
import { HelmetProvider } from 'react-helmet-async'

const RootLayout: React.FC = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
)
```

Это стандартный паттерн, официально поддерживаемый `vite-react-ssg` (он ищет `HelmetProvider` в дереве и извлекает helmet state при SSG). Ранее (в прошлом ходу) провайдер был удалён из-за ошибочной гипотезы про "конфликт вложенных провайдеров" — на самом деле `vite-react-ssg` рассчитывает, что провайдер поставит пользователь.

## Проверка

1. `npm run build` — SSG успех, теги `data-rh="true"` и JSON-LD присутствуют в 3-4 сгенерированных HTML (`/`, `/tsiny`, `/ekspertyzy/…`).
2. Playwright по прод-билду: клики по навигации без ошибок.
3. В dev-превью Lovable: страница загружается, ошибка `Cannot read properties of undefined (reading 'add')` исчезает.

## Что НЕ меняется

- Все SEO-компоненты (`SEOHead`, `BreadcrumbSEO`, `FAQPageSEO`, `MetaImages`, `preloadResources`) остаются на `Helmet`.
- Титлы, description, canonical, og:*, JSON-LD (BreadcrumbList, ProfessionalService, FAQPage) — не трогаем.
- Sitemap, robots.txt, llms.txt, canonical-домен — не трогаем.
- Индексация не пострадает.