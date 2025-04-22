
import React from 'react';

// Placeholder for partner logos
const partners = [
  { id: 1, name: "Partner 1" },
  { id: 2, name: "Partner 2" },
  { id: 3, name: "Partner 3" },
  { id: 4, name: "Partner 4" },
];

const PartnersSection: React.FC = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Наші партнери</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ми співпрацюємо з провідними організаціями в юридичній та експертній сфері
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24"
            >
              {/* Placeholder for partner logo */}
              <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                <span className="text-gray-500">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
