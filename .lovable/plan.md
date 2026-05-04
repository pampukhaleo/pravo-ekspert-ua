## Що відбувається

Сайт переїхав з GitHub Pages на Lovable hosting (`expertise.com.ua` як custom domain). У репозиторії досі лежать файли та скрипти заточені під gh-pages. Деякі з них **активно шкодять SEO** на новому хостингу.

## Що видалити / змінити

### 1. `package.json`
- Прибрати поле `"homepage": "https://expertise.com.ua"` — потрібне було лише для gh-pages.
- Видалити скрипт `"deploy"` (використовує `gh-pages`).
- Видалити скрипт `"predeploy"`.
- Прибрати `gh-pages` з `devDependencies`.

### 2. `scripts/deploy.sh`
Видалити повністю — це bash-скрипт для деплою на GitHub Pages. Lovable деплоїть автоматично через кнопку Publish.

### 3. `CNAME`
Видалити. Це файл для GitHub Pages, щоб прив'язати домен. На Lovable домен прив'язується через Project Settings → Domains (вже зроблено, бо `expertise.com.ua` працює).

### 4. `public/404.html` — **критично для SEO**
Видалити. Причини:
- Це fallback для gh-pages SPA-роутингу (`cp dist/index.html dist/404.html` у скрипті deploy).
- Lovable має вбудований SPA fallback — окремий 404.html не потрібен.
- Поточний `public/404.html` містить **застарілі дубльовані** `<title>` і `<meta description>` (ті самі, що ми щойно почистили з `index.html` у PR 1). Якщо його не видалити, Google може індексувати його як дубль головної.
- Він НЕ повертає HTTP 404 — тобто будь-який неіснуючий URL індексується як копія головної.

### 5. `scripts/organize-dist.js` — **залишаємо**
Цей скрипт перетворює `about.html` → `about/index.html`. Він був потрібен для gh-pages, але **також корисний на Lovable** — кожен SSG-маршрут отримує власну директорію з `index.html`, що дає чисті URL без `.html`. Залишаємо.

### 6. `scripts/generate-sitemap.js` — **залишаємо** (вже виправлено в PR 1)
Працює через `postbuild`. Lovable запускає `npm run build` при публікації, тому sitemap буде генеруватись автоматично.

### 7. NotFound сторінка (React) — додати `noindex`
Оскільки тепер немає окремого 404.html і SPA-роут `*` рендерить `NotFound.tsx`, додати в нього `<SEOHead noindex />` (через meta robots) — щоб Google не індексував "м'які 404".

Перевірю компонент `src/pages/NotFound.tsx` і `SEOHead` props у момент імплементації; якщо `SEOHead` не підтримує `noindex` — додам цей prop (одна стрічка `<meta name="robots" content="noindex, nofollow">`).

### 8. `README-SEO-IMPLEMENTATION.md`
Перевірити та прибрати згадки gh-pages / `npm run deploy`, замінити на "Publish через Lovable".

## Чого НЕ чіпаємо

- `index.html` (вже почищений у PR 1)
- SSG конфігурація (`vite-react-ssg`) — працює і там, і там
- `robots.txt`, `sitemap.xml` — коректні
- Структура маршрутів, SEOHead, JSON-LD

## Як перевірити після деплою

1. Натиснути **Publish → Update** у Lovable.
2. Відкрити `https://expertise.com.ua/sitemap.xml` — має повернути 200 з XML.
3. Відкрити `https://expertise.com.ua/неіснуюча-сторінка` — у `view-source:` має бути `<meta name="robots" content="noindex, nofollow">`.
4. View source головної — `<title>` і `<meta description>` мають бути унікальні (з `SEOHead`, не fallback з `index.html`).
5. Submit оновлений sitemap в Google Search Console + "Request indexing" головної.

## Відкат

Усі зміни — видалення легаси-файлів та редагування `package.json` / README. Якщо щось зламається — Lovable History (clock-icon) поверне попередню версію одним кліком.
