
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { newsItems } from '../data/newsData';

const NewsPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
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
