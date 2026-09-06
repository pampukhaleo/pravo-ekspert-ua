# Fix: сторінки послуг канонізуються на головну

## Причина
Маршрут `posluhy/:slug` у `src/App.tsx` не має `getStaticPaths` (на відміну від `ekspertyzy/:slug`), тому три сторінки послуг не пререндеряться у статичний HTML. На проді сервер віддає SPA-fallback `index.html`, у якому canonical — головна сторінка. Ahrefs бачить це як «Canonicalized to another URL».

## Що робимо
1. У `src/pages/ServicePage.tsx` додаємо експорт `getStaticPaths()`, що повертає три шляхи:
   - `posluhy/ekspertyza-za-ukhvaloiu-sudu`
   - `posluhy/ekspertne-doslidzhennia-za-zaiavoiu`
   - `posluhy/shcho-vkhodyt-u-vartist`
2. У `src/App.tsx` імпортуємо `getStaticPaths as getServiceStaticPaths` з `ServicePage` і додаємо його в маршрут `posluhy/:slug`.
3. Перевірка: після білду переконуємось, що з'явилися `dist/posluhy/<slug>/index.html` і в кожному `<link rel="canonical">` вказує на власну URL сторінки.

## Побічний ефект (позитивний)
Сторінки послуг отримають повний статичний HTML — краще для індексації та швидкості, а не тільки правильний canonical.
