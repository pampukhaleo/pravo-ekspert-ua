
import React from 'react';
import NewsSectionHeader from './news/NewsSectionHeader';
import NewsGrid from './news/NewsGrid';
import ViewAllNewsButton from './news/ViewAllNewsButton';

const NewsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <NewsSectionHeader />
        <NewsGrid />
        <ViewAllNewsButton />
      </div>
    </section>
  );
};

export default NewsSection;
