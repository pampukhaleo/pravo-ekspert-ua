
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationButton from '../components/ConsultationButton';

// Placeholder for expertise list
const expertiseList = [
  { id: 1, name: "Будівельно-технічна експертиза", slug: "budivelno-tekhnichna-ekspertyza", description: "Оцінка технічного стану будівель, відповідності будівельним нормам" },
  { id: 2, name: "Оціночно-будівельна експертиза", slug: "otsinochno-budivelna-ekspertyza", description: "Визначення вартості об'єктів нерухомості, будівельних робіт" },
  { id: 3, name: "Земельно-технічна експертиза", slug: "zemelno-tekhnichna-ekspertyza", description: "Дослідження земельних ділянок, визначення їх меж та характеристик" },
  { id: 4, name: "Інженерно-технічна експертиза", slug: "inzhenerno-tekhnichna-ekspertyza", description: "Дослідження інженерних систем, обладнання, комунікацій" },
  { id: 5, name: "Експертиза з питань землеустрою", slug: "ekspertyza-z-pytan-zemleustroiu", description: "Аналіз документації із землеустрою, відповідності нормативам" },
  { id: 6, name: "Оціночна експертиза", slug: "otsinochna-ekspertyza", description: "Визначення ринкової вартості майна різних видів" },
  { id: 7, name: "Почеркознавча експертиза", slug: "pocherkoznavcha-ekspertyza", description: "Встановлення автентичності підписів, почерку, авторства документів" },
  { id: 8, name: "Економічна експертиза", slug: "ekonomichna-ekspertyza", description: "Аналіз фінансово-господарської діяльності, виявлення порушень" },
  { id: 9, name: "Товарознавча експертиза", slug: "tovaroznavcha-ekspertyza", description: "Дослідження якості товарів, відповідності стандартам" },
  { id: 10, name: "Автотоварознавча експертиза", slug: "avtotovaroznavcha-ekspertyza", description: "Оцінка вартості автомобілів, визначення збитків після ДТП" },
  { id: 11, name: "Електротехнічна експертиза", slug: "elektrotekhnichna-ekspertyza", description: "Дослідження електричних приладів, систем, причин аварій" },
  { id: 12, name: "Пожежно-технічна експертиза", slug: "pozhezhno-tekhnichna-ekspertyza", description: "Встановлення причин пожеж, оцінка збитків" },
];

const ExpertisesListPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Експертизи
            </h1>
            <p className="text-lg text-gray-700">
              Ми надаємо широкий спектр експертних послуг у різних галузях. Оберіть потрібну вам експертизу з переліку нижче.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseList.map((expertise) => (
              <Link 
                key={expertise.id}
                to={`/ekspertyzy/${expertise.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{expertise.name}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{expertise.description}</p>
                  <div className="mt-auto pt-2">
                    <span className="text-brand-blue font-medium">Детальніше &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Не знаєте, яка експертиза вам потрібна?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Наші фахівці допоможуть обрати найбільш ефективне рішення для вашої ситуації. Зв'яжіться з нами для безкоштовної консультації.
            </p>
            <ConsultationButton size="lg" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpertisesListPage;
