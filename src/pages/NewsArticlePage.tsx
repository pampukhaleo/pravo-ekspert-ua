
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsArticleHeader from '../components/news/NewsArticleHeader';
import NewsArticleContent from '../components/news/NewsArticleContent';
import NewsNotFound from '../components/news/NewsNotFound';
import { allNewsWithContent } from '../data/fullNewsData';

const NewsArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = allNewsWithContent.find(item => item.slug === slug);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {article ? (
          <div className="container-custom">
            <NewsArticleHeader 
              title={article.title} 
              date={article.date} 
              imageUrl={article.imageUrl} 
            />
            <NewsArticleContent content={article.content} />
          </div>
        ) : (
          <NewsNotFound />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsArticlePage;
