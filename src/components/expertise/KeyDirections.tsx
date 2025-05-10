
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Direction {
  title: string;
  slug: string;
  description: string;
  fullContent?: string;
  icon?: string;
}

interface KeyDirectionsProps {
  directions: Direction[];
}

const KeyDirections: React.FC<KeyDirectionsProps> = ({ directions }) => {
  if (!directions || directions.length === 0) {
    return null;
  }

  // Define category colors for visual variety
  const categoryColors = [
    'from-blue-100 to-blue-50',
    'from-green-100 to-green-50',
    'from-amber-100 to-amber-50',
    'from-purple-100 to-purple-50',
    'from-rose-100 to-rose-50',
    'from-cyan-100 to-cyan-50'
  ];
  
  return (
    <section className="py-10">
      <div className="container-custom">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">КЛЮЧОВІ НАПРЯМКИ РОБОТИ:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directions.map((direction, index) => (
            <Link
              key={index}
              to={`/ekspertyzy/${direction.slug}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all flex flex-col h-full group"
            >
              <div className={`h-24 bg-gradient-to-r ${categoryColors[index % categoryColors.length]} flex items-center justify-center transition-transform group-hover:scale-105`}>
                {direction.icon ? (
                  <img src={direction.icon} alt={direction.title} className="h-12 w-12 object-contain" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-700">{direction.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-brand-blue font-semibold mb-3 group-hover:text-brand-light transition-colors">{direction.title}</h3>
                {direction.description && (
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{direction.description}</p>
                )}
                <div className="flex items-center text-brand-blue mt-auto pt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Детальніше</span>
                  <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyDirections;
