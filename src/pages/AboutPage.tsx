
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationButton from '../components/ConsultationButton';
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Award, BookOpen, CheckCircle, Users, Phone, Shield, Briefcase, ExternalLink } from "lucide-react";
import { expertiseData } from '../data/expertiseData';

const stats = [
  { value: '15+', label: 'років досвіду', icon: <BookOpen className="h-5 w-5" /> },
  { value: '1000+', label: 'проведених експертиз', icon: <CheckCircle className="h-5 w-5" /> },
  { value: '20+', label: 'видів експертиз', icon: <Award className="h-5 w-5" /> },
  { value: '95%', label: 'задоволених клієнтів', icon: <Users className="h-5 w-5" /> },
];

const AboutPage = () => {
  // Convert expertiseData object to array and add slug
  const expertiseList = Object.entries(expertiseData).map(([slug, data]) => ({
    slug,
    ...data
  }));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container-custom">
          {/* Header with improved animation */}
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Про нас
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-dark via-brand-blue to-brand-light mx-auto mb-6"></div>
            <p className="text-xl text-gray-700">
              НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ — ваш надійний партнер у сфері експертиз
            </p>
          </div>
          
          {/* Main content with enhanced layout - removed hover-lift class */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2">
              <Card className="h-full shadow-md border-0 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-brand-light to-brand-dark"></div>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-brand-blue mb-6 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Наша історія та досвід
                  </h2>
                  
                  <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
                    <p className="leading-relaxed">
                      Незалежний інститут судових експертиз (надалі – «НІСЕ») – це передова недержавна експертна установа, яка працює у сфері проведення судових експертиз та експертних досліджень з 2007 року.
                    </p>
                    
                    <p className="leading-relaxed">
                      За цей час напрацьовано величезний практичний досвід, що дозволяє НІСЕ проводити експертизи за більш ніж 20 напрямками на високому професійному рівні як за ухвалою суду, так і за заявою сторін.
                    </p>
                    
                    <p className="leading-relaxed">
                      Судові експерти НІСЕ атестовані Міністерством юстиції України та мають необхідну кваліфікацію та багаторічний досвід проведення експертиз та експертних досліджень. За необхідності НІСЕ залучає до роботи вузькопрофільних фахівців та експертів з інших юрисдикцій світу, що дає змогу проводити міжнародні комплексні комісійні експертизи підвищеної складності.
                    </p>
                    
                    <p className="leading-relaxed">
                      Мінімальний термін проведення експертизи в НІСЕ – від 10 робочих днів (в залежності від кількості питань, поставлених на дослідження, наданих документів, обсягу та складності робіт тощо).
                    </p>
                    
                    <p className="leading-relaxed">
                      НІСЕ має відмінну репутацію та довіру судів, адвокатської спільноти, підприємств. Кожному клієнту фахівці НІСЕ забезпечують індивідуальний підхід, комплексний супровід та експертну консультацію на найвищому професійному рівні.
                    </p>
                    
                    <p className="leading-relaxed">
                      Окрім практичної діяльності, НІСЕ активно сприяє розвитку судово-експертної галузі, організовуючи семінари, вебінари та круглі столи за участі експертів, адвокатів, суддів для обговорення законодавчих змін та актуальних питань у сфері судової експертизи, удосконалення методики проведення експертиз тощо.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full shadow-md border-0 overflow-hidden bg-gradient-to-br from-brand-blue to-brand-dark text-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Наші переваги
                  </h2>
                  
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span>Досвід з 2007 року</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span>Понад 20 видів експертиз</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span>Атестовані експерти</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span>Індивідуальний підхід</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span>Міжнародні експертизи</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span>Висока репутація</span>
                    </li>
                  </ul>

                  <Separator className="my-6 bg-white/20" />
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Отримайте консультацію</h3>
                    <Link to="/kontakty">
                      <Button className="w-full bg-white text-brand-blue hover:bg-white/90" size="lg">
                        <Phone className="mr-2 h-4 w-4" /> Зв'язатися з нами
                      </Button>
                    </Link>

                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Stats section with enhanced animations */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Наші досягнення
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className={`border-0 shadow-md overflow-hidden card-hover-effect animate-fade-in delay-${index * 100}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="rounded-full bg-brand-light/20 p-3 text-brand-blue">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-brand-blue mb-2">{stat.value}</div>
                    <div className="text-gray-700">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Expertise areas with visual enhancements and links to expertise pages */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Напрямки експертних досліджень
            </h2>
            
            <Card className="shadow-md border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                <p className="text-lg mb-6">
                  Перелік основних напрямків експертних досліджень, які проводить НІСЕ:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {expertiseList.slice(0, Math.ceil(expertiseList.length / 2)).map((expertise) => (
                    <Link 
                      key={expertise.slug}
                      to={`/ekspertyzy/${expertise.slug}`} 
                      className="flex items-start gap-3 group hover:bg-gray-100/50 p-2 rounded-md transition-all"
                    >
                      <div className="rounded-full bg-brand-light/20 p-1 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                        <CheckCircle className="h-4 w-4 text-brand-blue group-hover:text-white transition-colors" />
                      </div>
                      <span className="group-hover:text-brand-blue transition-colors flex-grow">{expertise.title}</span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 text-brand-blue transition-opacity" />
                    </Link>
                  ))}
                  
                  {expertiseList.slice(Math.ceil(expertiseList.length / 2)).map((expertise) => (
                    <Link 
                      key={expertise.slug}
                      to={`/ekspertyzy/${expertise.slug}`} 
                      className="flex items-start gap-3 group hover:bg-gray-100/50 p-2 rounded-md transition-all"
                    >
                      <div className="rounded-full bg-brand-light/20 p-1 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                        <CheckCircle className="h-4 w-4 text-brand-blue group-hover:text-white transition-colors" />
                      </div>
                      <span className="group-hover:text-brand-blue transition-colors flex-grow">{expertise.title}</span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 text-brand-blue transition-opacity" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Enhanced call to action */}
          <div className="bg-gradient-to-r from-brand-light/10 to-brand-dark/10 rounded-lg p-8 text-center animate-fade-in shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Готові до співпраці?</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Ми відкриті до співпраці та готові допомогти у вирішенні найскладніших експертних завдань. 
              Звертайтесь до НІСЕ – і отримаєте надійного партнера, який забезпечить об'єктивність, 
              достовірність та професіоналізм у кожному експертному висновку.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationButton size="lg" className="btn-animate" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
