
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationButton from '../components/ConsultationButton';

// Дані про ціни
const pricingData = [
  {
    id: 1,
    category: "Будівельно-технічні експертизи",
    items: [
      { name: "Визначення технічного стану будівлі", price: "від 8000 грн" },
      { name: "Оцінка якості будівельних робіт", price: "від 7000 грн" },
      { name: "Розподіл часток у спільному майні", price: "від 6000 грн" },
    ]
  },
  {
    id: 2,
    category: "Оціночні експертизи",
    items: [
      { name: "Оцінка нерухомості", price: "від 5000 грн" },
      { name: "Оцінка обладнання", price: "від 4000 грн" },
      { name: "Оцінка збитків", price: "від 6500 грн" },
    ]
  },
  {
    id: 3,
    category: "Земельні експертизи",
    items: [
      { name: "Встановлення меж земельної ділянки", price: "від 7500 грн" },
      { name: "Оцінка земельної ділянки", price: "від 6000 грн" },
      { name: "Експертиза документації із землеустрою", price: "від 5500 грн" },
    ]
  },
  {
    id: 4,
    category: "Інші види експертиз",
    items: [
      { name: "Почеркознавча експертиза", price: "від 3500 грн" },
      { name: "Економічна експертиза", price: "від 8000 грн" },
      { name: "Автотоварознавча експертиза", price: "від 4500 грн" },
    ]
  },
];

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наші ціни
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Вартість експертизи залежить від складності об'єкта, обсягу робіт та термінів виконання. Нижче наведені базові ціни на наші послуги.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
              <p>
                Для отримання точної вартості вашої експертизи, будь ласка, зв'яжіться з нами для консультації.
              </p>
            </div>
          </div>
          
          <div className="space-y-12">
            {pricingData.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {category.category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg shadow-md p-6"
                    >
                      <h3 className="text-lg font-medium text-gray-900 mb-4">{item.name}</h3>
                      <p className="text-2xl font-bold text-brand-blue">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Важлива інформація</h2>
              <div className="text-gray-700 text-left space-y-4">
                <p>
                  Кожна експертиза унікальна. Обсяг робіт залежить від питань на дослідження, наявності та повноти документів, технічних завдань.
                </p>
                <p>
                  Тому вартість експертизи завжди розраховується індивідуально після ознайомлення експертів з фабулою справи та документами.
                </p>
                <p>
                  Для отримання точної вартості вашої експертизи, будь ласка, надайте нам необхідну інформацію та документи.
                </p>
              </div>
              
              <div className="mt-8">
                <ConsultationButton size="lg" />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
