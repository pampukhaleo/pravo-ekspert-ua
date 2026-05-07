## Что показывают скриншоты Ahrefs

**Проблема 1: «Canonical URL has no incoming internal links» — 20 страниц направлений**

Все 20 URL — это страницы направлений (`/ekspertyzy/ekspertyza-koshtorysu`, `/ekspertyzy/transportno-trasolohichna-ekspertyza`, и т.д.). Причина:

- Единственное место, откуда на них ведут внутренние ссылки — это компонент `KeyDirections` внутри страницы родительской экспертизы.
- В `src/components/expertise/KeyDirections.tsx` строка 53: ссылка собирается как `to={`/ekspertyzy/${direction.slug}?from=directions`}`. Из-за query-параметра Ahrefs видит ссылку на `…?from=directions`, а canonical у самой страницы — чистый URL без параметра. Получается «inlinks: 0» к canonical.
- Кроме того, `ExpertisesListPage` ссылается только на топ-уровень (родительские экспертизы), но не на их направления — то есть в sitemap направления есть, а индексация по ссылкам слабая.

**Проблема 2: «Non-canonical page in sitemap» — `/tsiny`**

Ahrefs показывает, что у страницы `https://expertise.com.ua/tsiny` canonical = `https://expertise.com.ua/` (корень), хотя в `PricingPage.tsx` явно установлен `url="https://expertise.com.ua/tsiny"` в `SEOHead`. Значит, либо в prod-сборке canonical действительно неправильный (нужно проверить отдеплоенный HTML), либо это устаревшие данные краула. После предыдущих правок (`SEOHead` уже корректно ставит `<link rel="canonical">`), вероятнее всего нужно просто перезапустить краул. Но я также проверю, что в свежей сборке `/tsiny/index.html` содержит правильный canonical.

## План

### 1. Убрать `?from=directions` из ссылок на направления
**Файл:** `src/components/expertise/KeyDirections.tsx`
- Заменить `to={\`/ekspertyzy/${direction.slug}?from=directions\`}` на `to={\`/ekspertyzy/${direction.slug}\`}`.
- Это сразу даст canonical-страницам полноценные внутренние ссылки.
- Эффект «открыть таб Огляд при переходе из направлений» останется визуально неважным — все направления и так открываются на табе Огляд по умолчанию (`defaultValue="overview"`). Логику в `ExpertisePage.tsx` (`useEffect` с проверкой `from=directions`) можно оставить — она безвредна без параметра.

### 2. Добавить ссылки на направления на странице списка экспертиз
**Файл:** `src/pages/ExpertisesListPage.tsx`
- В каждой карточке экспертизы под основной ссылкой добавить компактный список ссылок на её направления (`expertise.directions`) — обычные `<Link to={\`/ekspertyzy/${d.slug}\`}>`.
- Это даёт направлениям ещё один источник внутренних ссылок и улучшает SEO/usability.

### 3. Проверить canonical на `/tsiny` в свежей сборке
**Действия (только проверка, без правок если всё ок):**
- Запустить локальную сборку и убедиться, что `dist/tsiny/index.html` содержит `<link rel="canonical" href="https://expertise.com.ua/tsiny">`.
- Если canonical правильный — проблема в устаревших данных Ahrefs, нужно просто перезапустить краул после деплоя.
- Если неправильный — найти причину (возможно, конфликт с `MetaImages`/`preloadResources` или дубль `<link rel="canonical">` в `index.html`).

### 4. (Опционально) Убрать `useEffect` с `from=directions` в `ExpertisePage.tsx`
После п.1 параметр больше не используется — можно почистить мёртвый код. Делаю, если подтвердите.

## Ожидаемый результат после деплоя и повторного краула

- «Canonical URL has no incoming internal links»: 20 → 0.
- «Non-canonical page in sitemap»: 1 → 0 (после перекраула).
- Бонус: страницы направлений получают внутренние ссылки и из карточек на `/ekspertyzy`, что улучшит их ранжирование.

Подтвердите план — и я внесу правки.
