
# План улучшений сайта по очереди

Делаем поэтапно. После каждого этапа — проверка, потом следующий.

## Этап 1 — Безопасность Supabase (критично)

1. **Закрыть открытую вставку в `leads`**: удалить политику `Anyone can insert leads`. Записывать заявки в БД только из edge function под service-role.
2. **Сохранять заявки из `contact-form` в БД** (сейчас они только в Telegram). Edge function будет вставлять запись в `leads` через service-role клиент.
3. **Скрыть `error.message`** в ответе клиенту — возвращать generic сообщение, детали только в логах.
4. **Ручные действия в Supabase Dashboard** (объясню после деплоя):
   - Включить Leaked Password Protection
   - Обновить Postgres до последней версии

Файлы: миграция SQL, `supabase/functions/contact-form/index.ts`.

## Этап 2 — SEO чистка

5. Удалить плейсхолдер `<meta name="google-site-verification" content="your-verification-code" />` из `src/components/SEO/SEOHead.tsx` (правильный код уже в `index.html`).
6. Убрать дубли `og:*` и `twitter:*` мета-тегов из `index.html` — оставить их только в `SEOHead` (динамические per-страница).
7. Заменить дефолтный `og:image` в `SEOHead.tsx` с lovable-превью на брендовый (использовать `/logonise.png` пока нет нормального баннера).

Файлы: `index.html`, `src/components/SEO/SEOHead.tsx`.

## Этап 3 — Производительность (Core Web Vitals)

8. Перенести **GTM** и **Hotjar** скрипты из `<head>` в конец `<body>` или загружать с `defer`/после `load`.
9. Google Fonts: добавить `rel="preload"` или загружать асинхронно (`media="print" onload="this.media='all'"`).

Файлы: `index.html`.

## Этап 4 — Sitemap

10. Починить `scripts/generate-sitemap.js`: убрать битые `<image:image>` ссылки на `/src/assets/*.png` (в production эти пути не существуют — Vite их хеширует).

Файлы: `scripts/generate-sitemap.js`.

## Этап 5 — Защита формы от спама (опционально)

11. Подключить **Cloudflare Turnstile** (бесплатно, без cookies, не требует UX-окна как reCAPTCHA). Добавить виджет на форму контактов и проверку токена в edge function.

Файлы: `src/pages/ContactPage.tsx`, `supabase/functions/contact-form/index.ts`, добавить секрет `TURNSTILE_SECRET_KEY`.

## Этап 6 — Админ-панель для заявок (опционально)

12. Создать страницу `/admin/leads` с авторизацией (Supabase Auth), таблицей заявок, фильтрами по статусу, заметками. Использовать уже существующие таблицы `leads` и `lead_notes`.

---

## Что дальше

Подтвердите, что начинаем с **Этапа 1** (Безопасность Supabase). После его реализации перейдём к Этапу 2 и так далее. Если хотите изменить порядок или пропустить какой-то этап — скажите.
