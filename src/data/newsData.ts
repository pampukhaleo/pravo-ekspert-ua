// Sample news data - in a real app, this would come from an API
export const newsItems = [
  {
    id: 1,
    title: 'Нові стандарти проведення будівельно-технічних експертиз в Україні',
    excerpt: 'Міністерство юстиції затвердило оновлені стандарти проведення будівельно-технічних експертиз, які вступлять в дію з наступного місяця.',
    date: '05.05.2025',
    imageUrl: '/lovable-uploads/291e2a7e-c8fd-4783-b66d-ab1590fa9a82.png',
    slug: 'novi-standarti-provedennya-budivelno-tekhnichnikh-ekspertiz'
  },
  {
    id: 2,
    title: 'НІСЕ розширює спектр послуг з оціночної експертизи',
    excerpt: 'Незалежний Інститут Судових Експертиз розпочав надання нових послуг у сфері оціночної експертизи інтелектуальної власності.',
    date: '28.04.2025',
    imageUrl: '/lovable-uploads/afeaa026-31d9-4edf-856c-974bb6e2543d.png',
    slug: 'nise-rozshiryue-spektr-poslug-z-otsinochnoi-ekspertizi'
  },
  {
    id: 3,
    title: 'Результати річного звіту діяльності НІСЕ: зростання на 35%',
    excerpt: 'Підбито підсумки діяльності Незалежного Інституту Судових Експертиз за минулий рік. Кількість проведених експертиз зросла на 35%.',
    date: '15.03.2025',
    imageUrl: '/lovable-uploads/82aaa092-850b-4fe7-aa90-b8d382b3524b.png',
    slug: 'rezultati-richnogo-zvitu-diyalnosti-nise'
  }
];

export type NewsItem = typeof newsItems[0];
