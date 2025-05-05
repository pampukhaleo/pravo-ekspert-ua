
import React from 'react';
import { Link } from 'react-router-dom';

interface Direction {
  title: string;
  slug: string;
  description: string;
  fullContent?: string;
}

interface KeyDirectionsProps {
  directions: Direction[];
}

const KeyDirections: React.FC<KeyDirectionsProps> = ({ directions }) => {
  if (!directions || directions.length === 0) {
    return null;
  }
  
  return (
    <section className="py-10">
      <div className="container-custom">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">КЛЮЧОВІ НАПРЯМКИ РОБОТИ:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directions.map((direction, index) => (
            <Link
              key={index}
              to={`/ekspertyzy/${direction.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <h3 className="text-brand-blue font-semibold mb-3">{direction.title}</h3>
              {direction.description && (
                <p className="text-sm text-gray-600">{direction.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyDirections;
