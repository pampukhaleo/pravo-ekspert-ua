
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
  },
  {
    id: 4,
    title: 'Розширення кадрового складу: нові експерти в команді НІСЕ',
    excerpt: 'До нашої команди приєдналися п\'ять нових висококваліфікованих експертів з різних спеціалізацій.',
    date: '01.03.2025',
    imageUrl: '/lovable-uploads/291e2a7e-c8fd-4783-b66d-ab1590fa9a82.png',
    slug: 'rozshirennya-kadrovogo-skladu-novi-eksperti'
  },
  {
    id: 5,
    title: 'Міжнародна акредитація судово-експертних методів НІСЕ',
    excerpt: 'Наші методи проведення комп\'ютерно-технічних експертиз отримали міжнародну акредитацію.',
    date: '10.02.2025',
    imageUrl: '/lovable-uploads/afeaa026-31d9-4edf-856c-974bb6e2543d.png',
    slug: 'mizhnarodna-akreditatsiya-sudovo-ekspertnikh-metodiv'
  }
];

const NewsPage = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              На головну
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Новини та події</h1>
            <p className="text-lg text-gray-600 max-w-3xl mb-12">
              Останні новини та події Незалежного Інституту Судових Експертиз
            </p>
          </div>
          
          <div className="space-y-8">
            {newsItems.map(news => (
              <div key={news.id} className="flex flex-col md:flex-row gap-6 bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="md:w-1/3 h-60 md:h-auto">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <span className="text-sm text-gray-500 block mb-2">{news.date}</span>
                  <h2 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
                    <Link to={`/novini/${news.slug}`}>{news.title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <Link 
                    to={`/novini/${news.slug}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Читати далі
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsPage;
