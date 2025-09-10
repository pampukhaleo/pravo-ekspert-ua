import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEO/SEOHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { newsItems } from '../data/newsData';

const NewsPage = () => {
  const { getBreadcrumbData, getWebPageData } = useStructuredData();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const webPageData = getWebPageData(
    "Новини та події | НІСЕ",
    "Останні новини та події Незалежного Інституту Судових Експертиз. Читайте про розвиток галузі судової експертизи в Україні.",
    "https://expertise.com.ua/novini",
    [
      { name: "Головна", url: "https://expertise.com.ua" },
      { name: "Новини", url: "https://expertise.com.ua/novini" }
    ]
  );

  // Add ItemList structured data for news articles
  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Новини НІСЕ",
    description: "Останні новини та події Незалежного Інституту Судових Експертиз",
    numberOfItems: newsItems.length,
    itemListElement: newsItems.map((news, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "NewsArticle",
        headline: news.title,
        description: news.excerpt,
        datePublished: news.date,
        url: `https://expertise.com.ua/novini/${news.slug}`,
        image: news.imageUrl,
        author: {
          "@type": "Organization",
          name: "НІСЕ",
          url: "https://expertise.com.ua"
        }
      }
    }))
  };

  const combinedStructuredData = [webPageData, itemListData];

  const breadcrumbItems = [
    { label: "Новини", isCurrentPage: true }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title="Новини та події | НІСЕ"
        description="Останні новини та події Незалежного Інституту Судових Експертиз. Читайте про розвиток галузі судової експертизи в Україні."
        keywords="новини НІСЕ, судова експертиза новини, події експертизи, Незалежний Інститут Судових Експертиз"
        url="https://expertise.com.ua/novini"
        structuredData={combinedStructuredData}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="container-custom">
          <div className="mb-6">
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
                    loading="lazy" 
                    width="400"
                    height="240"
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
