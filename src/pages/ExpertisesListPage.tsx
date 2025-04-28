
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationButton from '../components/ConsultationButton';
import { expertiseData } from '../data/expertiseData';

const ExpertisesListPage = () => {
  // Перетворюємо об'єкт expertiseData на масив та додаємо slug
  const expertiseList = Object.entries(expertiseData).map(([slug, data]) => ({
    slug,
    ...data
  }));

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
                key={expertise.slug}
                to={`/ekspertyzy/${expertise.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{expertise.title}</h2>
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
