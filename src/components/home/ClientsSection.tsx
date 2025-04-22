
import React from 'react';

// Placeholder for client logos
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
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Наші клієнти</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Нам довіряють провідні компанії та організації
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client) => (
            <div 
              key={client.id} 
              className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-32"
            >
              {/* Placeholder for client logo */}
              <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                <span className="text-gray-500">{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
