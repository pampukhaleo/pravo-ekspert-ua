
import React from 'react';
import ConsultationButton from '../ConsultationButton';

const services = [
  {
    id: 1,
    title: "Експертиза за ухвалою суду",
    steps: [
      "Одержуємо та вивчаємо матеріали справи",
      "Прораховуємо вартість робіт",
      "Призначаємо дату натурного обстеження та повідомляємо суд та сторони",
      "Виїжджаємо на об'єкт та проводимо натурне обстеження",
      "Готуємо експертний висновок та надсилаємо його в суд разом з наданими матеріалами"
    ]
  },
  {
    id: 2,
    title: "Експертне дослідження за заявою сторін",
    steps: [
      "Отримуємо заяву про проведення експертного дослідження та необхідні документи",
      "Вивчаємо надані документи, прораховуємо вартість робіт та укладаємо договір на проведення експертного дослідження",
      "Погоджуємо дату натурного обстеження та виїжджаємо на об'єкт дослідження",
      "Готуємо експертний висновок та надсилаємо його замовнику"
    ]
  },
  {
    id: 3,
    title: "Що входить у вартість",
    steps: [
      "З'ясування експертного завдання",
      "Аналіз та вивчення наданих на дослідження документів",
      "Натурне обстеження об'єкта дослідження",
      "Аналіз, узагальнення та систематизація результатів натурного обстеження об'єкта з вивченням відповідної нормативної документації",
      "Проведення експертного дослідження відповідно до обраної методики",
      "Підготовка експертного висновку та додатків",
      "Друкарське оформлення висновку",
      "Відправка експертного висновку замовнику",
      "Інші організаційні питання"
    ]
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Як ми працюємо</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Оберіть варіант співпраці, який підходить саме вам
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full"
            >
              <h3 className="text-xl font-semibold text-brand-blue mb-4">{service.title}</h3>
              
              <ul className="list-decimal pl-5 mb-6 text-gray-700 flex-grow">
                {service.steps.map((step, index) => (
                  <li key={index} className="mb-2">{step}</li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <ConsultationButton />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-gray-700 mb-0">
            Кожна експертиза унікальна. Обсяг робіт залежить від питань на дослідження, наявності та повноти документів, технічних завдань. Тому вартість експертизи завжди розраховується індивідуально після ознайомлення експертів з фабулою справи та документами.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
