
import React from 'react';
import { newsItems } from '@/data/newsData';
import NewsCard from './NewsCard';

const NewsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsItems.map(news => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  );
};

export default NewsGrid;
