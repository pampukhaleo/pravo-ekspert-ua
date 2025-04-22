
import React from 'react';
import ConsultationButton from '../ConsultationButton';
import { FileText, Handshake, Users } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: FileText,
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
    icon: Handshake,
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
    icon: Users,
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
    <section className="section-padding bg-gradient-to-br from-[#f3f8fc] via-[#e6f0fa] to-[#e2eafc]">
      <div className="container-custom">
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight">
            Як ми <span className="text-brand-blue">працюємо</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Оберіть варіант співпраці, який підходить саме вам
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 animate-fade-in">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white/95 border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.025] transition-all duration-200 p-7 flex flex-col h-full relative"
            >
              <div className="absolute -top-7 left-6">
                <service.icon className="text-brand-blue bg-[#e2eafc] rounded-full p-2 shadow-lg" size={38} />
              </div>
              <h3 className="text-xl font-semibold text-brand-blue mb-5 pt-5 pl-1 min-h-[56px]">{service.title}</h3>
              
              <ul className="list-decimal pl-5 mb-5 text-gray-700 flex-grow space-y-2 text-base leading-relaxed">
                {service.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
              
              <div className="pt-2">
                <ConsultationButton variant="outline" size="md" className="w-full" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 p-7 bg-white/70 border border-gray-200 rounded-2xl shadow-lg text-center max-w-4xl mx-auto animate-fade-in">
          <p className="text-gray-700 font-medium mb-0 text-lg">
            Кожна експертиза унікальна. Обсяг робіт залежить від питань, наявності документів та завдань.
            Вартість завжди розраховується індивідуально після вивчення матеріалів експертами.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
