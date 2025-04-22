
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExpertiseHeader from '../components/expertise/ExpertiseHeader';
import KeyDirections from '../components/expertise/KeyDirections';
import FAQ from '../components/expertise/FAQ';
import WhyUs from '../components/expertise/WhyUs';
import ConsultationButton from '../components/ConsultationButton';

// This is a placeholder data. In a real application, this would come from an API or CMS
const expertiseData = {
  "budivelno-tekhnichna-ekspertyza": {
    title: "Будівельно-технічна експертиза",
    description: "Будівельно-технічна експертиза дозволяє встановити фактичний стан будівлі, відповідність будівельних робіт нормам та стандартам, а також причини виникнення дефектів.",
    backgroundImage: "photo-1426604966848-d7adac402bff",
    content: `
      <p>Будівельно-технічна експертиза є одним з найважливіших інструментів для визначення якості будівництва та реконструкції об'єктів нерухомості. Наші експерти проводять детальний аналіз технічного стану будівель та споруд, оцінюють якість виконаних будівельних робіт, визначають відповідність будівельних робіт проектній документації та будівельним нормам.</p>
      <p>Експертиза особливо актуальна у випадках суперечок між замовниками та підрядниками, при виявленні дефектів будівельних робіт, при купівлі-продажу нерухомості, а також при оцінці збитків від неякісного будівництва.</p>
    `,
    directions: [
      { id: 1, name: "Технічний стан будівель та споруд", slug: "tekhnichnyy-stan-budivel" },
      { id: 2, name: "Якість будівельних робіт", slug: "yakist-budivelnykh-robit" },
      { id: 3, name: "Відповідність проектній документації", slug: "vidpovidnist-proektniy-dokumentatsii" },
    ],
    faqs: [
      { 
        id: 1, 
        question: "Скільки часу триває будівельно-технічна експертиза?", 
        answer: "Термін проведення експертизи залежить від складності об'єкта і може тривати від 5 до 30 робочих днів." 
      },
      { 
        id: 2, 
        question: "Які документи потрібні для проведення експертизи?", 
        answer: "Для проведення експертизи потрібні проектна документація, дозвільні документи на будівництво, акти виконаних робіт, фотоматеріали та інші технічні документи, пов'язані з об'єктом дослідження." 
      },
      { 
        id: 3, 
        question: "Чи можна використовувати експертний висновок у суді?", 
        answer: "Так, експертний висновок є офіційним документом і може бути використаний як доказ у судовому процесі." 
      },
    ]
  },
  // Add more expertise types here in the same format
};

const ExpertisePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Fallback data in case the slug doesn't match any expertise
  const defaultData = {
    title: "Експертиза",
    description: "Детальна інформація про експертизу",
    backgroundImage: "photo-1426604966848-d7adac402bff",
    content: "<p>Інформація про даний вид експертизи.</p>",
    directions: [],
    faqs: []
  };
  
  const expertise = slug && expertiseData[slug] ? expertiseData[slug] : defaultData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <ExpertiseHeader 
          title={expertise.title} 
          description={expertise.description}
          backgroundImage={expertise.backgroundImage}
        />
        
        <KeyDirections directions={expertise.directions} />
        
        <section className="py-10">
          <div className="container-custom">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: expertise.content }}
            />
          </div>
        </section>
        
        <FAQ faqs={expertise.faqs} />
        
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
