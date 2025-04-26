
import React from 'react';

const partners = [
  { id: 1, name: "Partner 1" },
  { id: 2, name: "Partner 2" },
  { id: 3, name: "Partner 3" },
  { id: 4, name: "Partner 4" },
  { id: 5, name: "Partner 5" },
];

const PartnersSection: React.FC = () => {
  return (
    <section className="py-12 border-t border-gray-200 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">
            Нам довіряють провідні організації в галузі
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <div className="h-8 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-medium">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
