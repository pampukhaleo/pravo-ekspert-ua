
# PR 4 — Убрать Product schema со страниц експертиз

## Проблема
Google Rich Results Test показывает на `/ekspertyzy/budivelno-tekhnichna-ekspertyza`:
- **Product snippets — invalid:** нет числового `price` (есть только текстовый `priceRange`).
- **Merchant listings — invalid:** нет `image`, `price`, `shippingDetails`, `hasMerchantReturnPolicy`.

Merchant Listings — это формат для интернет-магазинов с физической доставкой и возвратами. Судебная экспертиза — это услуга, и натягивать на неё Product schema контрпродуктивно: Google всё равно будет требовать shipping/returns.

`BreadcrumbList`, `FAQ`, `LocalBusiness`, `Organization` уже валидны и дают rich snippets. `ProfessionalService` уже отдаётся как отдельный блок — он и есть правильный тип для услуги, поддерживает `aggregateRating`, `offers`, `areaServed`.

## Решение
Удалить блок `Product` из `useStructuredData.ts` для страниц экспертиз. Оставить и усилить `ProfessionalService`.

## Изменения

### 1. `src/hooks/useStructuredData.ts`
- Удалить весь объект `Product` из массива JSON-LD на expertise-страницах.
- В существующий `ProfessionalService` добавить:
  - `aggregateRating: { "@type": "AggregateRating", ratingValue: 4.8, reviewCount: 127 }` (те же значения, что в LocalBusiness — для согласованности).
  - `offers: { "@type": "Offer", priceCurrency: "UAH", price: <минимальная цена из данных экспертизы как число>, priceSpecification: { "@type": "PriceSpecification", priceCurrency: "UAH", minPrice: <число> }, availability: "https://schema.org/InStock", url: <canonical>, areaServed: "UA" }` — с числовым `price` (минимум диапазона), без `priceRange`-строки.
  - `serviceType`, `areaServed`, `provider` — оставить как есть.
  - `image` — добавить URL логотипа (`https://expertise.com.ua/logonise.png`), чтобы и здесь было поле image.

### 2. Источник числовой цены
В `src/data/expertiseData.ts` (или где хранятся экспертизы) у каждой экспертизы есть текстовая цена «Від 2000 грн». Парсить её регуляркой `/(\d[\d\s]*)/` → `2000`. Если парс не удался — не отдавать `offers` вовсе (лучше отсутствие, чем invalid).

### 3. Проверить, не дублируется ли Product где-то ещё
Поиск по `rg "@type.*Product"` в `src/`. Если Product есть в других местах (например, в каком-то компоненте для главной) — не трогать, проблема только на expertise-страницах.

## Что **не** делаем
- Не добавляем `shippingDetails` / `hasMerchantReturnPolicy` — это не товар.
- Не оставляем Product «на всякий случай» — он будет помечен invalid и тянуть весь домен вниз в Search Console.
- Не трогаем `BreadcrumbList`, `FAQPage`, `LocalBusiness`, `Organization` — они валидны.

## После деплоя — что должен показать Rich Results Test
- Product snippets: **0 items** (исчез — это норм).
- Merchant listings: **0 items** (исчез — это норм).
- Breadcrumbs: 1 valid ✅
- FAQ: 1 valid ✅
- Local businesses: 3 valid ✅
- Organization: 3 valid ✅
- (Опционально) `ProfessionalService` Google не показывает отдельной категорией, но использует для понимания сущности.

Итог: «10 items detected: Some are invalid» → «8 items detected, all valid».

Подтвердите — и переключаемся в build mode.
