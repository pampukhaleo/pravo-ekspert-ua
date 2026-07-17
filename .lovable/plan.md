## Fix hydration crash: revert to react-helmet-async

**Проблема:** после клика по любой ссылке — `n is not a function` + React hydration errors #418/#423. Причина: `Head` из `vite-react-ssg` конфликтует с гидрацией (особенно JSON-LD).

**Решение:** вернуться на `react-helmet-async` — официально поддерживается `vite-react-ssg`, стабильно рендерит теги и в SSG HTML, и на клиенте.

### Шаги

1. **`src/App.tsx`** — обернуть приложение в единственный `<HelmetProvider>`.
2. **`src/components/SEO/SEOHead.tsx`** — заменить `Head` → `Helmet`, JSON-LD через `<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />` внутри `<Helmet>`.
3. **`src/components/SEO/BreadcrumbSEO.tsx`** — то же.
4. **`src/components/SEO/FAQPageSEO.tsx`** — то же.
5. **`src/components/SEO/MetaImages.tsx`** — `Head` → `Helmet`.
6. **`src/components/SEO/preloadResources.tsx`** — `Head` → `Helmet` (или удалить, если дублирует `index.html`).
7. **`src/pages/ExpertisePage.tsx`** — исправить `useEffect` со `async` (ScrollToTop warning в логах), убедиться что cleanup `?from=directions` работает синхронно.
8. Проверить, что `react-helmet-async` есть в `package.json` (если нет — добавить).

### Проверка после билда

- `npm run build` → SSG отработал без ошибок.
- В сгенерированном HTML для `/`, `/ekspertyzy/budivelno-tekhnichna-ekspertyza`, `/tsiny` присутствуют: `<title>`, `<meta name="description">`, `<link rel="canonical">`, все `og:*`, JSON-LD (Breadcrumb, ProfessionalService, FAQPage).
- Playwright прогон: клики по хедеру/карточкам не выдают ошибок в консоли, роутинг работает.

### Что НЕ ломается

- Все титлы/описания/canonical/og — на местах.
- Все 4 JSON-LD schema — на местах, Rich Results Test продолжит их видеть.
- Sitemap, robots.txt, llms.txt — не трогаем.
- URL и canonical не меняются.

После имплементации подтвержу результатом сборки и скринами Playwright.
