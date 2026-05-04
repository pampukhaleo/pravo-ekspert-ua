## PR 2 — Поглиблений SEO (продовження після очистки GitHub Pages)

Мета: щоб Google краще розумів структуру сайту (хлібні крихти як rich-results) і індексував картинки експертиз/новин.

### 1. Підключити `BreadcrumbSEO` до сторінок
Зараз компонент `src/components/SEO/BreadcrumbSEO.tsx` існує, але **ніде не використовується** (rg підтвердив — 0 імпортів). Додати JSON-LD `BreadcrumbList` на сторінках, де вже є візуальні `<Breadcrumbs>`:

- `src/pages/ExpertisePage.tsx` — Головна → Експертизи → {назва}
- `src/pages/ExpertisesListPage.tsx` — Головна → Експертизи
- `src/pages/ServicePage.tsx` — Головна → Послуги → {назва}
- `src/pages/NewsPage.tsx` — Головна → Новини
- `src/pages/NewsArticlePage.tsx` — Головна → Новини → {заголовок}
- `src/pages/AboutPage.tsx`, `ContactPage.tsx`, `PricingPage.tsx` — відповідні крихти

Передавати абсолютні URL (`https://expertise.com.ua/...`), як того вимагає schema.org.

### 2. `scripts/generate-sitemap.js` — додати `<image:image>`
Розширити генерацію sitemap, щоб для категорій експертиз і новин додавати теги картинок:

```xml
<url>
  <loc>https://expertise.com.ua/ekspertyzy/budivelno-tekhnichna-ekspertyza</loc>
  <image:image>
    <image:loc>https://expertise.com.ua/...png</image:loc>
    <image:title>Будівельно-технічна експертиза</image:title>
  </image:image>
</url>
```

- Для **експертиз**: парсити `backgroundImage` + `title` з `expertiseData.ts` (треба резолвити `expertiseImages["..."]` → шлях у `public/`; якщо складно — взяти з мапи в `src/assets/expertiseImages.ts`).
- Для **новин**: парсити `imageUrl` + `title` з `newsData.ts` (вже є as-is, шляхи відносні `/lovable-uploads/...` → префіксувати `baseUrl`).

xmlns `image` уже оголошено в sitemap.

### 3. Виправити URL експертиз у sitemap
Зараз `parseTypeScriptExport` додає **і ключі категорій, і `directionSlugs`** як `/ekspertyzy/{slug}` — але directions насправді живуть всередині категорії і не мають окремих сторінок такого URL. Перевірю роутинг (`App.tsx`) і:
- якщо `/ekspertyzy/:directionSlug` НЕ існує як окремий маршрут → прибрати блок `directionSlugs` з sitemap (він плодить 404/дублі).
- якщо існує — залишити.

### 4. Дрібниці
- `index.html`: перевірити, чи стоїть `<link rel="icon">` і `<link rel="apple-touch-icon">` (для favicon в результатах пошуку).
- `robots.txt`: переконатись, що `Sitemap: https://expertise.com.ua/sitemap.xml` присутній.
- `NotFound.tsx`: підтвердити, що `SEOHead` отримує `robots="noindex, nofollow"` (вже є — просто перевірка).

### Що НЕ чіпаємо
- Жодних змін в дизайні/контенті.
- `SEOHead`, `MetaImages` — вже добре налаштовані.
- Структура маршрутів.

### Технічні нотатки
- `BreadcrumbSEO` рендериться через `react-helmet-async` всередині сторінки (не в layout), щоб JSON-LD був унікальним для кожного маршруту під час SSG.
- `expertiseImages` — TS-об'єкт; для парсингу в Node-скрипті простіше відкрити `src/assets/expertiseImages.ts` regexp-ом і побудувати мапу `name → public path`.

### Перевірка після деплою
1. `view-source:` сторінки експертизи → шукати `"@type":"BreadcrumbList"`.
2. Google Rich Results Test (https://search.google.com/test/rich-results) → ввести URL → має показати "Breadcrumbs detected".
3. `https://expertise.com.ua/sitemap.xml` → відкрити, переконатись що під деякими `<url>` є `<image:image>`.
4. У GSC → Pages → подивитись, чи зменшилась кількість "Discovered – currently not indexed".
