
import React from 'react';
import { Newspaper } from 'lucide-react';

const NewsSectionHeader: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4">
        <Newspaper className="h-6 w-6 text-gray-700 mr-2" />
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Останні оновлення
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Новини та події
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl">
        Будьте в курсі останніх новин, подій та досягнень Незалежного Інституту Судових Експертиз.
      </p>
    </div>
  );
};

export default NewsSectionHeader;
