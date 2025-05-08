
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample news data - in a real app, this would come from an API
const newsItems = [
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

const NewsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Newspaper className="h-6 w-6 text-gray-700 mr-2" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Останні оновлення
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Новини та події
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Будьте в курсі останніх новин, подій та досягнень Незалежного Інституту Судових Експертиз.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map(news => (
            <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
              <Link to={`/novini/${news.slug}`}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <span className="text-sm text-gray-500">{news.date}</span>
                  <h3 className="text-xl font-medium hover:text-blue-600 transition-colors">{news.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{news.excerpt}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/novini"
            className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Всі новини
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
