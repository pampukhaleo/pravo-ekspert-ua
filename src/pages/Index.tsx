
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/home/Hero';
import ExpertiseCarousel from '../components/home/ExpertiseCarousel';
import ServicesSection from '../components/home/ServicesSection';
import PartnersSection from '../components/home/PartnersSection';
import EventsCalendar from '../components/home/EventsCalendar';
import VideoRecordings from '../components/home/VideoRecordings';
import NewsSection from '../components/home/NewsSection';
import FaqSection from '../components/home/FaqSection';
import SEOHead from '../components/SEO/SEOHead';
import { useStructuredData } from '../hooks/useStructuredData';

const Index = () => {
  const { getOrganizationData } = useStructuredData();
  
  // Ensure we start at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title="НІСЕ - Незалежний Інститут Судових Експертиз"
        description="Професійні експертні послуги у сфері будівельно-технічної, оціночної, земельної та інших видів судової експертизи. Досвідчені експерти, якісні висновки."
        keywords="судова експертиза, будівельно-технічна експертиза, оціночна експертиза, земельна експертиза, експертний висновок, НІСЕ, Київ"
        url="https://nise.com.ua"
        structuredData={getOrganizationData()}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <ExpertiseCarousel />
        <PartnersSection />
        <ServicesSection />
        <EventsCalendar />
        <VideoRecordings />
        {/*<NewsSection />*/}
        <FaqSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
