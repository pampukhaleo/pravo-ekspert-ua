
import React from 'react';
import { Handshake } from 'lucide-react';

const partners = [
  { id: 1, name: "Partner 1" },
  { id: 2, name: "Partner 2" },
  { id: 3, name: "Partner 3" },
  { id: 4, name: "Partner 4" },
];

const PartnersSection: React.FC = () => {
  return (
    <section className="section-padding bg-[#f8fbfe]">
      <div className="container-custom">
        <div className="text-center mb-10 animate-fade-in">
          <Handshake className="mx-auto text-brand-blue mb-4 animate-scale-in" size={36} />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Наші партнери</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg">
            Ми співпрацюємо з провідними організаціями в юридичній та експертній сфері
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white/80 border border-gray-200 rounded-xl shadow-sm flex items-center justify-center h-20 md:h-24 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <div className="bg-gray-100 w-full h-full flex items-center justify-center rounded">
                <span className="text-gray-500 text-base md:text-lg font-semibold">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
