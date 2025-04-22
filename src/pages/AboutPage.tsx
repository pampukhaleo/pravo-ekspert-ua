
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationButton from '../components/ConsultationButton';

const stats = [
  { value: '15+', label: 'років досвіду' },
  { value: '1000+', label: 'проведених експертиз' },
  { value: '20+', label: 'видів експертиз' },
  { value: '95%', label: 'задоволених клієнтів' },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Про нас
            </h1>
            <p className="text-lg text-gray-700">
              НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ — ваш надійний партнер у сфері експертиз
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Наша історія
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ (НІСЕ) успішно працює у сфері проведення експертизи з 2007 року. За цей час ми провели понад 1000 різноманітних експертиз та здобули репутацію професійної і надійної експертної установи.
                </p>
                <p>
                  Наша команда складається з висококваліфікованих фахівців з великим досвідом роботи. Всі наші експерти атестовані Міністерством юстиції України та мають право проводити відповідні експертизи.
                </p>
                <p>
                  За необхідності ми залучаємо до роботи вузькопрофільних фахівців та експертів з інших юрисдикцій світу, що дає змогу проводити міжнародні комплексні комісійні експертизи підвищеної складності.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Зображення офісу або команди</span>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Наші досягнення
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md p-6 text-center"
                >
                  <div className="text-4xl font-bold text-brand-blue mb-2">{stat.value}</div>
                  <div className="text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Наша команда
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-500">Фото фахівця</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Ім'я Прізвище</h3>
                  <p className="text-brand-blue mb-4">Керівник компанії</p>
                  <p className="text-gray-700">
                    Короткий опис досвіду та кваліфікації фахівця.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-500">Фото фахівця</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Ім'я Прізвище</h3>
                  <p className="text-brand-blue mb-4">Головний експерт</p>
                  <p className="text-gray-700">
                    Короткий опис досвіду та кваліфікації фахівця.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-500">Фото фахівця</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Ім'я Прізвище</h3>
                  <p className="text-brand-blue mb-4">Юрист-консультант</p>
                  <p className="text-gray-700">
                    Короткий опис досвіду та кваліфікації фахівця.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Потрібна консультація?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Зв'яжіться з нами для отримання безкоштовної консультації або замовлення експертизи.
            </p>
            <ConsultationButton size="lg" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
