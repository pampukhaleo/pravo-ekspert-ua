
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEO/SEOHead';
import { useStructuredData } from '../hooks/useStructuredData';

interface ServiceContent {
  title: string;
  content: string[];
}

const services: Record<string, ServiceContent> = {
  "ekspertyza-za-ukhvaloiu-sudu": {
    title: "Експертиза за ухвалою суду",
    content: [
      "Одержуємо та вивчаємо матеріали справи;",
      "Прораховуємо вартість робіт;",
      "Призначаємо дату натурного обстеження та повідомляємо суд та сторони;",
      "Виїжджаємо на об'єкт та проводимо натурне обстеження;",
      "Готуємо експертний висновок та надсилаємо його в суд разом з наданими матеріалами."
    ]
  },
  "ekspertne-doslidzhennia-za-zaiavoiu": {
    title: "Експертне дослідження за заявою сторін",
    content: [
      "Отримуємо заяву про проведення експертного дослідження та необхідні документи;",
      "Вивчаємо надані документи, прораховуємо вартість робіт та укладаємо договір на проведення експертного дослідження;",
      "Погоджуємо дату натурного обстеження та виїжджаємо на об'єкт дослідження;",
      "Готуємо експертний висновок та надсилаємо його замовнику."
    ]
  },
  "shcho-vkhodyt-u-vartist": {
    title: "Що входить у вартість",
    content: [
      "З'ясування експертного завдання;",
      "Аналіз та вивчення наданих на дослідження документів;",
      "Натурне обстеження об'єкта дослідження;",
      "Аналіз, узагальнення та систематизація результатів натурного обстеження об'єкта з вивченням відповідної нормативної документації;",
      "Проведення експертного дослідження відповідно до обраної методики;",
      "Підготовка експертного висновку та додатків;",
      "Друкарське оформлення висновку;",
      "Відправка експертного висновку замовнику;",
      "Інші організаційні питання."
    ]
  }
};

const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getServiceData, getBreadcrumbData } = useStructuredData();
  
  const serviceContent = slug ? services[slug] : null;
  
  useEffect(() => {
    if (!serviceContent) {
      navigate('/404');
    }
    
    window.scrollTo(0, 0);
  }, [serviceContent, navigate]);

  const breadcrumbData = getBreadcrumbData([
    { name: "Головна", url: "https://expertise.com.ua" },
    { name: "Послуги", url: "https://expertise.com.ua/posluhy" },
    { name: serviceContent?.title || "Послуга", url: `https://expertise.com.ua/posluhy/${slug}` }
  ]);

  const serviceStructuredData = serviceContent ? 
    getServiceData(serviceContent.title, serviceContent.content.join(' ')) : 
    breadcrumbData;
  
  if (!serviceContent) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${serviceContent.title} | НІСЕ`}
        description={`${serviceContent.title} - детальна інформація про послугу від Незалежного Інституту Судових Експертиз`}
        keywords={`${serviceContent.title.toLowerCase()}, НІСЕ, судова експертиза, послуги експертизи`}
        url={`https://expertise.com.ua/posluhy/${slug}`}
        structuredData={serviceStructuredData}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{serviceContent.title}</h1>
          
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <ol className="space-y-8">
              {serviceContent.content.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <p className="text-lg text-gray-700 leading-relaxed pt-1">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicePage;
