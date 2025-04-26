
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import ClientsSection from '../components/home/ClientsSection';
import PartnersSection from '../components/home/PartnersSection';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <PartnersSection />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
        
        <section className="relative py-20 bg-gray-900">
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/82aaa092-850b-4fe7-aa90-b8d382b3524b.png" 
              alt="Експертиза НІСЕ" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>
          </div>
          
          <div className="container-custom relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ваш надійний партнер у кожній ситуації
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Відданість до забезпечення високоякісних експертних послуг з 2007 року - наш шлях до вашої довіри
            </p>
            <Link 
              to="/kontakty" 
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Отримати консультацію
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
