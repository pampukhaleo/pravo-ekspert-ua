
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface NewsArticleContentProps {
  content: string;
}

const NewsArticleContent: React.FC<NewsArticleContentProps> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="prose prose-lg max-w-none mb-12" 
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <div className="border-t border-gray-200 pt-8 mt-8">
        <Link 
          to="/novini" 
          className="inline-flex items-center text-blue-600 font-medium hover:underline"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Назад до всіх новин
        </Link>
      </div>
    </div>
  );
};

export default NewsArticleContent;
