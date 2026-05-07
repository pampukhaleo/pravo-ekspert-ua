## Что показывают скриншоты Ahrefs (Notice)

### 1. «Page has only one dofollow incoming internal link» (20 страниц с `?from=directions`)
Это **остатки прошлого краула** — все URL с `?from=directions`. Мы уже убрали этот параметр в `KeyDirections.tsx` в прошлый раз. После повторного краула эти 20 уведомлений исчезнут сами. Действий в коде не нужно.

### 2. «Title too long» (10) — те же URL с `?from=directions`
Тот же остаток. Title мы уже укоротили до `<Назва> | НІСЕ`. После повторного краула пропадёт.

### 3. «Indexable page not in sitemap» (1) — `/posluhy/shcho-vkhodyt-u-vartist`
Странно — в `scripts/generate-sitemap.js` парсится `services` из `src/components/home/ServicesSection.tsx`. Проверить нужно: содержит ли тот файл слаг `shcho-vkhodyt-u-vartist`. Если нет (или регэксп его не ловит) — добавить эти 3 слага напрямую в `staticRoutes` либо парсить `src/pages/ServicePage.tsx` (где определён объект `services`).

### 4. «HTTP to HTTPS redirect» (1) и «Redirect chain» (1)
Это редиректы домена/хостинга:
- `http://expertise.com.ua` → 301 → `https://expertise.com.ua` (это нормально, так и должно быть).
- `http://www.expertise.com.ua` → 302 → `http://expertise.com.ua` → 301 → `https://expertise.com.ua` (это redirect chain длиной 2 — нежелательно).

Решение — настроить на стороне хостинга Lovable, чтобы `http://www.` сразу редиректил на `https://` без промежуточного хопа, и желательно 301 вместо 302. **В коде не правится** — обращаться в поддержку Lovable.

### 5. «Page and SERP titles do not match» (1) — главная
Title на странице: `НІСЕ - Незалежний Інститут Судових Експертиз`. Title в SERP Google: `Незалежний Інститут Судових Експертиз: НІСЕ`. Google переписал title, потому что считает, что начинать с бренда «НІСЕ» (малоизвестный акроним) хуже, чем с полного названия. Решение — переписать title на главной так, чтобы он совпадал с SERP-версией:
`Незалежний Інститут Судових Експертиз — НІСЕ` (60 символов).

## План правок

### Правка 1: добавить service-страницы в sitemap явно
**Файл:** `scripts/generate-sitemap.js`

Поскольку `services` определён в `src/pages/ServicePage.tsx` (а не в `ServicesSection.tsx`, как сейчас парсится), регэксп вероятно их не находит. Самое надёжное — захардкодить 3 service-слага в `staticRoutes`:
```js
{ url: '/posluhy/ekspertyza-za-ukhvaloiu-sudu', priority: '0.7', changefreq: 'monthly' },
{ url: '/posluhy/ekspertne-doslidzhennia-za-zaiavoiu', priority: '0.7', changefreq: 'monthly' },
{ url: '/posluhy/shcho-vkhodyt-u-vartist', priority: '0.7', changefreq: 'monthly' },
```
И убрать (или оставить как fallback) парсинг `services` из `ServicesSection.tsx`.

### Правка 2: title главной страницы под SERP
**Файлы:** `src/pages/Index.tsx`, `src/components/SEO/SEOHead.tsx`

- В `Index.tsx` (строка 39): заменить `title="НІСЕ - Незалежний Інститут Судових Експертиз"` → `title="Незалежний Інститут Судових Експертиз — НІСЕ"`.
- В `SEOHead.tsx` (default, строка 21): то же самое.

### Что НЕ правим
- 20 страниц «only one dofollow inlink» и 10 «title too long» (`?from=directions`) — устаревшие данные краула, исчезнут после повторного запуска Ahrefs.
- HTTP→HTTPS redirect и redirect chain — настройка хостинга Lovable, в коде не правим.

## Ожидаемый результат после деплоя и повторного краула
- «Indexable page not in sitemap»: 1 → 0.
- «Page and SERP titles do not match»: 1 → 0 (после переиндексации Google).
- 20 + 10 устаревших уведомлений с `?from=directions` исчезнут.
- HTTP/redirect chain — останутся (хостинг).

Подтвердите план — реализую правки 1 и 2.
