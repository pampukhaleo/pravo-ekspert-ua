
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const expertiseList = [
  { id: 1, name: "Будівельно-технічна експертиза", slug: "budivelno-tekhnichna-ekspertyza" },
  { id: 2, name: "Оціночно-будівельна експертиза", slug: "otsinochno-budivelna-ekspertyza" },
  { id: 3, name: "Земельно-технічна експертиза", slug: "zemelno-tekhnichna-ekspertyza" },
  { id: 4, name: "Інженерно-технічна експертиза", slug: "inzhenerno-tekhnichna-ekspertyza" },
  { id: 5, name: "Експертиза з питань землеустрою", slug: "ekspertyza-z-pytan-zemleustroiu" },
  { id: 6, name: "Оціночна експертиза", slug: "otsinochna-ekspertyza" },
  { id: 7, name: "Почеркознавча експертиза", slug: "pocherkoznavcha-ekspertyza" },
  { id: 8, name: "Економічна експертиза", slug: "ekonomichna-ekspertyza" },
];

const AboutSection: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-[#eef4fa] via-[#f0f5fe] to-[#e6edf6]/70">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto mb-14 text-center animate-fade-in">
          <BookOpen className="mx-auto text-brand-blue mb-4 animate-scale-in" size={42} />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Про <span className="text-brand-blue">Інститут</span>
          </h2>
          <div className="text-gray-700 font-medium text-lg leading-relaxed max-w-3xl mx-auto mb-0">
            <p className="mb-2">
              <strong>НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ (НІСЕ)</strong> успішно працює у сфері проведення експертизи з 2007 року.
            </p>
            <p className="mb-2">
              Експерти атестовані Міністерством юстиції України. За потреби залучаємо вузькопрофільних фахівців з інших юрисдикцій, що дозволяє виконувати міжнародні комплексні експертизи.
            </p>
            <p>
              Спеціалізуємось на >20 видах експертиз. Оберіть потрібну або скористайтесь пошуком:
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-8 justify-center max-w-5xl mx-auto mb-8 animate-fade-in">
          {expertiseList.map((expertise) => (
            <Link 
              key={expertise.id}
              to={`/ekspertyzy/${expertise.slug}`}
              className="bg-white/90 border border-gray-200 backdrop-blur-lg rounded-xl shadow-md hover:shadow-lg hover:scale-105 hover:bg-[#e2eafc]/70 transition-all duration-200 p-6 flex flex-col items-start cursor-pointer min-h-[160px]"
            >
              <h3 className="font-semibold text-brand-blue mb-2 text-lg">{expertise.name}</h3>
              <span className="text-gray-600 text-sm mt-auto pt-3">Детальніше &rarr;</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center animate-fade-in">
          <Link 
            to="/ekspertyzy" 
            className="inline-block px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-[#346994] via-[#4a7bb6] to-[#b0c4de] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            style={{ letterSpacing: ".01em" }}
          >
            Більше експертиз
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
