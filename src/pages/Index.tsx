
import React from 'react';
import { Link } from 'react-router-dom';
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <ExpertiseCarousel />
        <PartnersSection />
        <ServicesSection />
        <EventsCalendar />
        <VideoRecordings />
        <NewsSection />
        <FaqSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
