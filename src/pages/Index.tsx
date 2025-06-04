
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/home/Hero';
import ExpertiseCarousel from '../components/home/ExpertiseCarousel';
import ServicesSection from '../components/home/ServicesSection';
import PartnersSection from '../components/home/PartnersSection';
import EventsCalendar from '../components/home/EventsCalendar';
import VideoRecordings from '../components/home/VideoRecordings';
import FaqSection from '../components/home/FaqSection';
import SEOHead from '../components/SEO/SEOHead';
import { useStructuredData } from '../hooks/useStructuredData';

const Index = () => {
  const { getOrganizationData, getLocalBusinessData, getWebPageData } = useStructuredData();
  
  // Комбинируем несколько типов structured data
  const combinedStructuredData = [
    getOrganizationData(),
    getLocalBusinessData(),
    getWebPageData(
      "Незалежний Інститут Судових Експертиз (НІСЕ)",
      "Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України. Будівельно-технічні, оціночні, земельні та інші види експертиз.",
      "https://expertise.com.ua",
      [{ name: "Головна", url: "https://expertise.com.ua" }]
    )
  ];

  // Ensure we start at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title="НІСЕ - Незалежний Інститут Судових Експертиз"
        description="Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України. Будівельно-технічні, оціночні, земельні та інші види експертиз."
        keywords="судова експертиза, незалежна експертиза, будівельно-технічна експертиза, оціночна експертиза, НІСЕ, експертний висновок, Київ"
        url="https://expertise.com.ua"
        structuredData={combinedStructuredData}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <ExpertiseCarousel />
        <PartnersSection />
        <ServicesSection />
        <EventsCalendar />
        <VideoRecordings />
        <FaqSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
