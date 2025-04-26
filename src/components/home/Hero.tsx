
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-28 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/82aaa092-850b-4fe7-aa90-b8d382b3524b.png" 
          alt="Експерти НІСЕ" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Супроводжуємо вас через кожен юридичний шлях з експертизою
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Наша команда досвідчених експертів пропонує професійність, компетентність та надійність для забезпечення виняткової експертної підтримки, що відповідає вашим унікальним потребам.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/kontakty"
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Замовити консультацію
            </Link>
            <Link 
              to="/ekspertyzy"
              className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors inline-flex items-center"
            >
              Наші послуги <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
