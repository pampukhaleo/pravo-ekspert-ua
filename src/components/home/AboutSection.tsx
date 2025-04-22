
import React from 'react';
import { Link } from 'react-router-dom';

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
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-gray-700">
            <p className="mb-4">
              <strong>НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ (НІСЕ)</strong> успішно працює у сфері проведення експертизи з 2007 року.
            </p>
            <p className="mb-4">
              Судові експерти НІСЕ атестовані Міністерством юстиції України. За необхідності залучаємо до роботи вузькопрофільних фахівців та експертів з інших юрисдикцій світу, що дає змогу проводити міжнародні комплексні комісійні експертизи підвищеної складності.
            </p>
            <p>
              Ми спеціалізуємось на більш ніж 20 видах експертиз. Скористайтесь пошуком або оберіть потрібну Вам експертизу з переліку:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseList.map((expertise) => (
              <Link 
                key={expertise.id}
                to={`/ekspertyzy/${expertise.slug}`}
                className="expertise-card"
              >
                <h3 className="font-medium text-gray-900 mb-2">{expertise.name}</h3>
                <div className="mt-auto pt-2">
                  <span className="text-brand-blue text-sm">Детальніше &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/ekspertyzy" 
              className="btn-primary"
            >
              Більше експертиз
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
