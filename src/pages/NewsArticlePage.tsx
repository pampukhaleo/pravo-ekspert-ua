
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import NewsArticleHeader from '../components/news/NewsArticleHeader';
import NewsArticleContent from '../components/news/NewsArticleContent';
import NewsNotFound from '../components/news/NewsNotFound';
import SEOHead from '../components/SEO/SEOHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { allNewsWithContent } from '../data/fullNewsData';

const NewsArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = allNewsWithContent.find(item => item.slug === slug);
  const { getBreadcrumbData } = useStructuredData();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const breadcrumbData = getBreadcrumbData([
    { name: "Головна", url: "https://nise.com.ua" },
    { name: "Новини", url: "https://nise.com.ua/novini" },
    { name: article?.title || "Стаття", url: `https://nise.com.ua/novini/${slug}` }
  ]);

  const articleStructuredData = article ? [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      datePublished: article.date,
      author: {
        "@type": "Organization",
        name: "НІСЕ"
      },
      publisher: {
        "@type": "Organization",
        name: "НІСЕ",
        logo: {
          "@type": "ImageObject",
          url: "https://nise.com.ua/logonise.png"
        }
      },
      image: article.imageUrl,
      url: `https://nise.com.ua/novini/${slug}`
    },
    breadcrumbData
  ] : breadcrumbData;

  const breadcrumbItems = [
    { label: "Новини", href: "/novini" },
    { label: article?.title || "Стаття", isCurrentPage: true }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {article && (
        <SEOHead
          title={`${article.title} | НІСЕ`}
          description={article.excerpt || article.content.substring(0, 160).replace(/<[^>]*>/g, '')}
          keywords="новини НІСЕ, судова експертиза, Незалежний Інститут Судових Експертиз"
          url={`https://nise.com.ua/novini/${slug}`}
          type="article"
          image={article.imageUrl}
          structuredData={articleStructuredData}
        />
      )}
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {article && <Breadcrumbs items={breadcrumbItems} />}
        
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
