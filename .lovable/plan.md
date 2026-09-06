# План: короткі SEO-заголовки для 3 сторінок напрямків

## Проблема
Ahrefs: «Title too long» (>60 символів) на трьох сторінках напрямків — title обрізається у видачі Google:
- `/ekspertyzy/vyznachennia-yakosti-ta-otsinka-vartosti-remontno-budivelnykh-robit` — 70 символів
- `/ekspertyzy/ekspertyza-rozpodilu-zemelnoi-dilianky-ta-vyznachennia-poriadku-korystuvannia` — 80
- `/ekspertyzy/trasolohichna-ekspertyza-slidiv-zlomu` — 90

SEO-заголовок формується в `ExpertisePage.tsx` як `{назва напряму} | НІСЕ`. Назви довгі, бо беруться прямо з даних (той самий текст — видимий H1 на сторінці).

## Рішення
Короткий SEO-title окремо від видимого H1. H1 на сторінці **не змінюється** — лише meta title.

1. **`src/data/expertiseData.ts`** — для цих трьох напрямків додати необов'язкове поле `seoTitle` (короткий варіант назви):
   - `Оцінка вартості ремонтно-будівельних робіт` (→ title 49 символів)
   - `Експертиза розподілу земельної ділянки` (→ 45)
   - `Трасологічна експертиза слідів злому` (→ 44)
   - Тип у інтерфейсі напряму розширити: `seoTitle?: string`.

2. **`src/pages/ExpertisePage.tsx`** — у формулі SEO-заголовка використати `selectedDirection.seoTitle ?? selectedDirection.title`.

## Технічні деталі
- H1 (`pageTitle`), контент, description, keywords — без змін.
- Canonical і URL не чіпаємо — індексація не постраждає.
- Після збірки перевірити: `<title>` у статичному HTML цих трьох сторінок ≤ 60 символів.
- Після публікації — повторний crawl в Ahrefs; попередження має зникнути.
