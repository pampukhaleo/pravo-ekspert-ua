
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NewsNotFound: React.FC = () => {
  return (
    <div className="container-custom">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="h-5 w-5 mr-2" />
        На головну
      </Link>
      <h1 className="text-2xl font-bold mb-4">Статтю не знайдено</h1>
      <p className="mb-8">Запитана стаття не існує або була видалена.</p>
      <Link 
        to="/novini" 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Повернутися до новин
      </Link>
    </div>
  );
};

export default NewsNotFound;
