
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface NewsArticleHeaderProps {
  title: string;
  date: string;
  imageUrl: string;
}

const NewsArticleHeader: React.FC<NewsArticleHeaderProps> = ({ title, date, imageUrl }) => {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Головна
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/novini" className="hover:text-blue-600 transition-colors">
            Новини
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="truncate max-w-[200px]">{title}</span>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        
        <div className="flex items-center mb-8">
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        
        <div className="mb-8">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </>
  );
};

export default NewsArticleHeader;
