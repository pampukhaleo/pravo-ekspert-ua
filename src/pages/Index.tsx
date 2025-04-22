
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import ClientsSection from '../components/home/ClientsSection';
import PartnersSection from '../components/home/PartnersSection';
import ConsultationButton from '../components/ConsultationButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
        <PartnersSection />
        
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

export default Index;
