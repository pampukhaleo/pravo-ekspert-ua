
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="mb-8">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Експертиза</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Надійний партнер для вирішення будь-якої ситуації
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            В НЕЗАЛЕЖНОМУ ІНСТИТУТІ СУДОВИХ ЕКСПЕРТИЗ ми надаємо високоякісні експертні послуги та супроводжуємо вас на кожному етапі із відданістю справі.
          </p>
        </div>
        
        <div className="mt-12 relative">
          <div className="w-full h-80 md:h-96 bg-gray-100 rounded-xl overflow-hidden mb-16">
            <img 
              src="/lovable-uploads/afeaa026-31d9-4edf-856c-974bb6e2543d.png" 
              alt="Експерт надає консультацію" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {expertiseList.slice(0, 4).map((expertise) => (
              <Link 
                key={expertise.id}
                to={`/ekspertyzy/${expertise.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-6 flex items-start hover:shadow-md transition-shadow duration-300"
              >
                <div className="mr-5 mt-1 p-2 bg-gray-100 rounded-full">
                  <BookOpen className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">{expertise.name}</h3>
                  <p className="text-gray-500 mt-1">Детальний аналіз та експертна оцінка</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <Link 
              to="/ekspertyzy" 
              className="px-5 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Всі наші експертизи
            </Link>
            <Link
              to="/pro-nas"
              className="px-5 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Дізнатися більше
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
