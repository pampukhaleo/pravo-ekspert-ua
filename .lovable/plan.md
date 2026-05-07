## Что показывают скриншоты Ahrefs (warnings)

### 1. Title too long (10 страниц) — все направления экспертиз
Пример: `ВИЗНАЧЕННЯ ЯКОСТІ ТА ОЦІНКА ВАРТОСТІ РЕМОНТНО-БУДІВЕЛЬНИХ РОБІТ — Будівельно-технічна експертиза | НІСЕ` (103 символа). Источник — `src/pages/ExpertisePage.tsx`:
```ts
const seoTitle = selectedDirection
  ? `${selectedDirection.title} — ${expertise.title} | НІСЕ`  // <- слишком длинно
  : `${expertise.title} | НІСЕ`
```
Конкатенация с родительской категорией пробивает лимит ~60 символов.

### 2. Title too short (1) — `/pro-nas`
`Про нас | НІСЕ` = 14 символов. Источник — `src/pages/AboutPage.tsx`. Нужен заголовок с ключевыми словами (50-60 символов).

### 3. Meta description too short (1) — `/posluhy/shcho-vkhodyt-u-vartist`
99 символов вместо рекомендованных 120-160. Источник — `src/pages/ServicePage.tsx`, описание шаблонное:
```ts
description={`${serviceContent.title} - детальна інформація про послугу від Незалежного Інституту Судових Експертиз`}
```
Шаблон даёт короткие описания для всех трёх сервисов.

### 4. 3XX / 302 redirect (3 + 2) — `http://www.`, `http://`
Это редиректы на уровне хостинга Lovable + custom domain (HTTP→HTTPS, www→non-www). В коде проекта мы их не контролируем — конфигурация делается на стороне DNS/хостинга. Можно только сообщить пользователю.

### 5. Slow page (65) — TTFB 3-15 сек
Это тоже не правится в коде — страницы статические (vite-react-ssg), TTFB зависит от хостинга/CDN Lovable. Возможные причины: cold start, отсутствие CDN-кэша. Сообщить пользователю.

### 6. (Из 2-го скриншота, нижняя часть) URL с `?from=directions`, Is indexable: No
Это **уже устранено** в прошлом сообщении — `KeyDirections.tsx` теперь рендерит чистые URL без параметра. После повторного краула эти записи исчезнут.

## План правок

### Правка 1: укоротить title для страниц направлений
**Файл:** `src/pages/ExpertisePage.tsx`

Заменить:
```ts
const seoTitle = selectedDirection
  ? `${selectedDirection.title} — ${expertise.title} | НІСЕ`
  : `${expertise.title} | НІСЕ`
```
на:
```ts
const seoTitle = selectedDirection
  ? `${selectedDirection.title} | НІСЕ`
  : `${expertise.title} | НІСЕ`
```

Контекст родительской экспертизы остаётся в `description`, `breadcrumbs` и H1 — для SEO достаточно. Все 10 длинных тайтлов уйдут под 60 символов.

### Правка 2: расширить title для `/pro-nas`
**Файл:** `src/pages/AboutPage.tsx`

Заменить `title="Про нас | НІСЕ"` на:
```
title="Про нас — Незалежний Інститут Судових Експертиз | НІСЕ"
```
(~57 символов, с ключевыми словами).

То же самое для `webPageData(...)` первого аргумента.

### Правка 3: индивидуальные мета-описания для услуг
**Файл:** `src/pages/ServicePage.tsx`

Расширить `ServiceContent`-интерфейс полем `description?: string` и задать описания 130-155 символов для каждой из 3 услуг:
- `ekspertyza-za-ukhvaloiu-sudu` — про процедуру судебной экспертизы по ухвалі
- `ekspertne-doslidzhennia-za-zaiavoiu` — про досудове експертне дослідження
- `shcho-vkhodyt-u-vartist` — детально, что включено в стоимость

В `<SEOHead>`: `description={serviceContent.description ?? <fallback>}`.

### Правка 4 (без кода): 3XX redirects, slow page
Объяснить пользователю в финальном сообщении:
- 302/301 на http и www-версии — настройка домена на стороне Lovable. Если нужно убрать 302 → 301, обращаться в поддержку Lovable / проверить настройки кастомного домена.
- Slow page — особенность хостинга (cold start). Можно проверить, что Lovable деплой использует CDN; в коде ускорять нечего (страницы уже SSG, картинки оптимизированы).

## Ожидаемый результат

- Title too long: 10 → 0
- Title too short: 1 → 0
- Meta description too short: 1 → 0
- 3XX redirects: останется (хостинг)
- Slow page: останется (хостинг)
- Inlinks `?from=directions`: исчезнут после повторного краула

Подтвердите план — реализую правки 1–3.
