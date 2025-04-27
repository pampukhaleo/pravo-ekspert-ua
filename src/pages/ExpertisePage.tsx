
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExpertiseHeader from '../components/expertise/ExpertiseHeader';
import KeyDirections from '../components/expertise/KeyDirections';
import FAQ from '../components/expertise/FAQ';
import WhyUs from '../components/expertise/WhyUs';
import ConsultationButton from '../components/ConsultationButton';
import { expertiseData } from '../data/expertiseData';

const ExpertisePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Fallback data in case the slug doesn't match any expertise
  const defaultData = {
    title: "Експертиза",
    description: "Детальна інформація про експертизу",
    backgroundImage: "/placeholder.svg",
    content: "<p>Інформація про даний вид експертизи.</p>",
    directions: [],
    faqs: []
  };
  
  // Перевірка, чи це посилання на основну експертизу чи на напрямок
  let expertise = defaultData;
  let selectedDirection = null;

  // Перевірка, чи існує експертиза з таким slug
  if (slug && expertiseData[slug]) {
    expertise = expertiseData[slug];
  } else {
    // Пошук напрямку по всім експертизам
    for (const expertiseKey in expertiseData) {
      const currentExpertise = expertiseData[expertiseKey];
      const foundDirection = currentExpertise.directions.find(dir => dir.slug === slug);
      
      if (foundDirection) {
        expertise = currentExpertise;
        selectedDirection = foundDirection;
        break;
      }
    }
  }
  
  // Get the correct background image, considering both expertise and direction
  const backgroundImage = selectedDirection && selectedDirection.backgroundImage 
    ? selectedDirection.backgroundImage 
    : expertise.backgroundImage;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <ExpertiseHeader 
          title={selectedDirection ? selectedDirection.title : expertise.title} 
          description={selectedDirection ? selectedDirection.description : expertise.description}
          backgroundImage={backgroundImage}
        />
        
        {!selectedDirection && <KeyDirections directions={expertise.directions} />}
        
        <section className="py-10">
          <div className="container-custom">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedDirection ? selectedDirection.fullContent : expertise.content }}
            />
          </div>
        </section>
        
        <FAQ faqs={expertise.faqs || []} />
        
        <WhyUs />
        
        <section className="py-16 bg-brand-blue text-white text-center">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-6">Потрібна консультація експерта?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Наші спеціалісти допоможуть вам обрати оптимальне рішення для вашої ситуації
            </p>
            <ConsultationButton className="bg-white text-brand-blue hover:bg-gray-100" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpertisePage;
