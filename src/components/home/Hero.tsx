
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Експертиза є не лише належним доказом у судовому провадженні, але і засобом мирного врегулювання спірних питань!
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <ul className="space-y-4 text-left">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-brand-blue text-white h-6 w-6 mr-3 mt-0.5 flex-shrink-0">1</span>
                <span className="text-gray-700">Потребуєте обгрунтованих підстав для пред'явлення претензій?</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-brand-blue text-white h-6 w-6 mr-3 mt-0.5 flex-shrink-0">2</span>
                <span className="text-gray-700">Необхідно встановити причинно-наслідковий зв'язок певних подій та ситуацій?</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-brand-blue text-white h-6 w-6 mr-3 mt-0.5 flex-shrink-0">3</span>
                <span className="text-gray-700">Хочете встановити величину завданої шкоди?</span>
              </li>
            </ul>
          </div>
          
          <Link 
            to="/kontakty" 
            className="btn-primary inline-block px-8 py-3 text-lg"
          >
            Отримати консультацію
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
