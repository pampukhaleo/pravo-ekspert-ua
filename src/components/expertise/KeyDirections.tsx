
import React from 'react';
import { Link } from 'react-router-dom';

interface Direction {
  id: number;
  name: string;
  slug: string;
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {directions.map((direction) => (
            <Link
              key={direction.id}
              to={`/ekspertyzy/${direction.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-brand-blue font-medium">{direction.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyDirections;
