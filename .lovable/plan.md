## Удалить блок "Календар / Заходи НІСЕ" с главной страницы

### Что делаем
В `src/pages/Index.tsx`:
- Убрать импорт `EventsCalendar` и `getNextEvent`
- Убрать `<EventsCalendar />` из JSX
- Убрать из `combinedStructuredData` блок с `getEventData(nextEvent...)` и переменную `nextEvent`

### Опционально (можно оставить на потом)
Файлы становятся неиспользуемыми, их можно удалить, чтобы не засорять проект:
- `src/components/home/EventsCalendar.tsx`
- `src/components/home/events/` (EventCard, CalendarView, EventsList, eventsData)

Календарь также используется в `src/components/home/events/CalendarView.tsx` через `@/components/ui/calendar` — сам UI-компонент `calendar.tsx` оставляем (это shadcn primitive, может пригодиться).

### Что НЕ трогаем
- Навигация, SEO meta, sitemap — упоминаний календаря/событий там нет.
- Остальные секции главной (Hero, ExpertiseCarousel, Partners, Services, VideoRecordings, FAQ) остаются как есть.

Подтвердите — удалять ли заодно файлы компонентов событий, или только скрыть секцию?