
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
  backgroundImage = "/placeholder.svg"
}) => {
  // Правильно форматуємо URL зображення
  const imagePath = backgroundImage.startsWith('http') || backgroundImage.startsWith('/') 
    ? backgroundImage 
    : `/${backgroundImage}`;

  return (
    <section 
      className="relative pt-40 pb-20 md:pt-48 md:pb-28"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${imagePath})`,
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
                  <a href="tel:+380675555222" className="mr-4 hover:underline">
                    +38 (067) 5555 222
                  </a>
                  <a href="mailto:info@nise.com.ua" className="hover:underline">
                    info@nise.com.ua
                  </a>
                </div>
              </div>
              <div>
                <ConsultationButton variant="primary" size="lg"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseHeader;
