
import React from 'react';
import ConsultationButton from '../ConsultationButton';

interface ExpertiseHeaderProps {
  title: string;
  description: string;
  backgroundImage?: string;
}

const ExpertiseHeader: React.FC<ExpertiseHeaderProps> = ({ 
  title, 
  description,
  backgroundImage = "/placeholder.svg" // Зображення за замовчуванням
}) => {
  // Правильно форматуємо URL зображення
  // Якщо шлях до зображення не починається з '/' або 'http', додаємо '/' для забезпечення правильного шляху
  const imagePath = backgroundImage.startsWith('http') || backgroundImage.startsWith('/') 
    ? backgroundImage 
    : `/${backgroundImage}`;

  console.log('Шлях до фонового зображення:', imagePath); // Для відлагодження

  return (
    <section 
      className="relative pt-40 pb-20 md:pt-48 md:pb-28"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/pravo-ekspert-ua/${imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {title}
          </h1>
          
          <p className="text-gray-200 text-lg mb-8">
            {description}
          </p>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-5 border border-white border-opacity-20 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white mb-2">Потрібна консультація?</p>
                <div className="flex items-center text-white">
                  <span className="mr-4">+38 (067) 5555 222</span>
                  <span>info@nise.com.ua</span>
                </div>
              </div>
              <div>
                <ConsultationButton variant="primary" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseHeader;
