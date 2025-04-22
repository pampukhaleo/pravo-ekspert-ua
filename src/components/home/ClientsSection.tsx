
import React from 'react';
import { Building } from 'lucide-react';

const clients = [
  { id: 1, name: "Client 1" },
  { id: 2, name: "Client 2" },
  { id: 3, name: "Client 3" },
  { id: 4, name: "Client 4" },
  { id: 5, name: "Client 5" },
  { id: 6, name: "Client 6" },
];

const ClientsSection: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-tl from-[#f0f5fe] via-[#eff6fa] to-[#e6edf6]/70">
      <div className="container-custom">
        <div className="text-center mb-10 animate-fade-in">
          <Building className="mx-auto text-brand-blue mb-4 animate-scale-in" size={38} />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Наші клієнти</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg">
            Нам довіряють провідні компанії та організації
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-fade-in">
          {clients.map((client) => (
            <div 
              key={client.id} 
              className="bg-white/80 border border-gray-200 rounded-xl shadow-sm flex items-center justify-center h-24 md:h-32 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <div className="bg-gray-100 w-full h-full flex items-center justify-center rounded">
                <span className="text-gray-500 text-base md:text-lg font-semibold">{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
