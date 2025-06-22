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
  currentSlug?: string; // Add currentSlug to identify the current direction
}

const KeyDirections: React.FC<KeyDirectionsProps> = ({ directions, currentSlug }) => {
  // If there are no directions or only one direction which is the current one, don't show anything
  if (!directions || directions.length === 0 || (directions.length === 1 && directions[0].slug === currentSlug)) {
    return null;
  }

  // Filter out the current direction if we're viewing a specific direction
  const filteredDirections = currentSlug 
    ? directions.filter(direction => direction.slug !== currentSlug)
    : directions;
  
  // If there are no other directions after filtering, don't show anything
  if (filteredDirections.length === 0) {
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
          {filteredDirections.map((direction, index) => (
            <Link
              key={index}
              to={`/ekspertyzy/${direction.slug}?from=directions`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all flex flex-col h-full group"
            >
              <div className={`h-24 bg-gradient-to-r ${categoryColors[index % categoryColors.length]} flex items-center justify-center p-5`}>
                <span className="font-bold text-gray-700">{ direction.title.toUpperCase() }</span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                {direction.description && (
                  <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">{direction.description}</p>
                )}
                <div className="flex items-center text-brand-blue mt-auto pt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Детальніше</span>
                  <ArrowRight size={16} className="ml-2" />
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
