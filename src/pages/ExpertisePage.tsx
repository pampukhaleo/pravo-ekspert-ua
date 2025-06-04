import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ExpertiseHeader from '../components/expertise/ExpertiseHeader';
import KeyDirections from '../components/expertise/KeyDirections';
import FAQ from '../components/expertise/FAQ';
import WhyUs from '../components/expertise/WhyUs';
import ConsultationButton from '../components/ConsultationButton';
import SEOHead from '../components/SEO/SEOHead';
import { useStructuredData } from '../hooks/useStructuredData';
import { expertiseData } from '../data/expertiseData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { FileText, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const ExpertisePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const { getProfessionalServiceData, getBreadcrumbData } = useStructuredData();
  
  // Check if we're coming from a direction link
  useEffect(() => {
    // If the URL has a 'from=directions' query parameter, set the active tab to 'overview'
    if (location.search.includes('from=directions')) {
      setActiveTab('overview');
    }
  }, [location]);
  
  // Резервні дані на випадок, якщо slug не збігається з жодною експертизою
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
  let parentExpertiseSlug = null;

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
        parentExpertiseSlug = expertiseKey; // Зберігаємо slug батьківської експертизи
        break;
      }
    }
  }
  
  // Отримуємо правильне фонове зображення, враховуючи як експертизу, так і напрямок
  const backgroundImage = selectedDirection && selectedDirection.backgroundImage 
    ? selectedDirection.backgroundImage 
    : expertise.backgroundImage;

  // Визначаємо етапи проведення експертизи (приклад даних)
  const stages = [
    { title: "Подання заяви", description: "Клієнт звертається із заявою про проведення експертизи, надаючи всю необхідну інформацію та документи." },
    { title: "Аналіз матеріалів", description: "Експерти ретельно вивчають отримані матеріали, визначають обсяг робіт та обирають відповідну методологію дослідження." },
    { title: "Проведення експертних досліджень", description: "Виконується комплекс необхідних досліджень, вимірювань і аналізів відповідно до чинних стандартів та методик." },
    { title: "Підготовка експертного висновку", description: "На основі результатів досліджень формується обґрунтований, детальний експертний висновок, який містить висновки та обґрунтування." }
  ];
  
  const pageTitle = selectedDirection ? selectedDirection.title : expertise.title;
  const pageDescription = selectedDirection ? selectedDirection.description : expertise.description;
  
  const breadcrumbItems = selectedDirection && parentExpertiseSlug ? [
    { label: "Експертизи", href: "/ekspertyzy" },
    { label: expertise.title, href: `/ekspertyzy/${parentExpertiseSlug}` },
    { label: selectedDirection.title, isCurrentPage: true }
  ] : [
    { label: "Експертизи", href: "/ekspertyzy" },
    { label: pageTitle, isCurrentPage: true }
  ];

  const structuredData = [
    getProfessionalServiceData(
      pageTitle, 
      pageDescription,
      `https://nise.com.ua/ekspertyzy/${slug}`,
      expertise.directions
    ),
    getBreadcrumbData([
      { name: "Головна", url: "https://nise.com.ua" },
      { name: "Експертизи", url: "https://nise.com.ua/ekspertyzy" },
      ...(selectedDirection && parentExpertiseSlug ? [
        { name: expertise.title, url: `https://nise.com.ua/ekspertyzy/${parentExpertiseSlug}` },
        { name: selectedDirection.title, url: `https://nise.com.ua/ekspertyzy/${slug}` }
      ] : [
        { name: pageTitle, url: `https://nise.com.ua/ekspertyzy/${slug}` }
      ])
    ])
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${pageTitle} | НІСЕ`}
        description={`${pageDescription} - професійна експертиза від Незалежного Інституту Судових Експертиз`}
        keywords={`${pageTitle.toLowerCase()}, судова експертиза, НІСЕ, експертний висновок, ${pageTitle.toLowerCase()} експертиза`}
        url={`https://nise.com.ua/ekspertyzy/${slug}`}
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <ExpertiseHeader 
          title={selectedDirection ? selectedDirection.title : expertise.title} 
          description={selectedDirection ? selectedDirection.description : expertise.description}
          backgroundImage={backgroundImage}
        />
        
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="container-custom py-10">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="flex gap-2 items-center">
                <FileText size={18} />
                <span>Огляд</span>
              </TabsTrigger>
              <TabsTrigger value="process" className="flex gap-2 items-center">
                <CheckCircle size={18} />
                <span>Етапи</span>
              </TabsTrigger>
              <TabsTrigger value="directions" className="flex gap-2 items-center">
                <MessageSquare size={18} />
                <span>Напрямки</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex gap-2 items-center">
                <Clock size={18} />
                <span>FAQ</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div 
                className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-6"
                dangerouslySetInnerHTML={{ __html: selectedDirection ? selectedDirection.fullContent : expertise.content }}
              />
            </TabsContent>
            
            <TabsContent value="process" className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Етапи проведення експертизи</h2>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
                  
                  <div className="space-y-10">
                    {stages.map((stage, index) => (
                      <div key={index} className="flex flex-col md:flex-row items-start gap-4 md:gap-8 relative">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-lg z-10 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 flex-grow">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{stage.title}</h3>
                          <p className="text-gray-600">{stage.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="directions" className="animate-fade-in">
              {expertise.directions.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Напрямки експертизи</h2>
                  <KeyDirections directions={expertise.directions} currentSlug={slug} />
                  {(selectedDirection && expertise.directions.filter(dir => dir.slug !== slug).length === 0) && (
                    <p className="text-gray-600">
                      Немає інших напрямків для цієї експертизи.
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Напрямки експертизи</h2>
                  <p className="text-gray-600">
                    Для даної експертизи немає додаткових напрямків.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="faq" className="animate-fade-in">
              <FAQ faqs={expertise.faqs || []} />
              {expertise.faqs?.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <p className="text-gray-600">
                    На даний момент немає часто задаваних питань для цієї експертизи.
                    Ви можете задати своє питання через форму консультації.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {activeTab === 'overview' && !selectedDirection && expertise.directions.length > 0 && (
            <div className="mt-10">
              <KeyDirections directions={expertise.directions} />
            </div>
          )}
        </div>
        
        <WhyUs />
        
        <section className="py-16 bg-brand-blue text-white text-center">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-6">Потрібна консультація експерта?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Наші спеціалісти допоможуть вам обрати оптимальне рішення для вашої ситуації
            </p>
            <ConsultationButton className="bg-white !text-black hover:bg-gray-100" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpertisePage;
