
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import ExpertiseCarousel from '../components/home/ExpertiseCarousel';
import PartnersSection from '../components/home/PartnersSection';
import ClientsSection from '../components/home/ClientsSection';
import FaqSection from '../components/home/FaqSection';
import NewsSection from '../components/home/NewsSection';
import Footer from '../components/Footer';
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
      "https://nise.com.ua",
      [{ name: "Головна", url: "https://nise.com.ua" }]
    )
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="НІСЕ - Незалежний Інститут Судових Експертиз"
        description="Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України. Будівельно-технічні, оціночні, земельні та інші види експертиз."
        keywords="судова експертиза, незалежна експертиза, будівельно-технічна експертиза, оціночна експертиза, НІСЕ, експертний висновок, Київ"
        url="https://nise.com.ua"
        structuredData={combinedStructuredData}
      />
      
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ExpertiseCarousel />
      <PartnersSection />
      <ClientsSection />
      <FaqSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
