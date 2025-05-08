
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NewsItem } from '@/data/newsData';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
      <Link to={`/novini/${news.slug}`} onClick={() => window.scrollTo(0, 0)}>
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
  );
};

export default NewsCard;
