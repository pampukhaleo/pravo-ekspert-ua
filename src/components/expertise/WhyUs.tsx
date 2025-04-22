
import React from 'react';

const reasons = [
  {
    id: 1,
    title: "Професійність",
    description: "Наші експерти мають значний досвід роботи та найвищу кваліфікацію"
  },
  {
    id: 2,
    title: "Надійність",
    description: "Працюємо з 2007 року, за цей час провели понад 1000 експертиз"
  },
  {
    id: 3,
    title: "Офіційний статус",
    description: "Всі наші експерти атестовані Міністерством юстиції України"
  },
  {
    id: 4,
    title: "Повний спектр послуг",
    description: "Виконуємо всі види експертиз від простих до комплексних міжнародних"
  },
  {
    id: 5,
    title: "Оперативність",
    description: "Ми цінуємо ваш час і виконуємо роботу в стислі терміни"
  }
];

const WhyUs: React.FC = () => {
  return (
    <section className="py-10">
      <div className="container-custom">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ЧОМУ ВАРТО ОБРАТИ НАС</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div key={reason.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-brand-blue mb-3">{reason.title}</h3>
              <p className="text-gray-700">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
