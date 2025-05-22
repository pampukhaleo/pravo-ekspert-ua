import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationButton from '../components/ConsultationButton';
import { expertiseData } from '../data/expertiseData';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const ExpertisesListPage = () => {
  // Convert expertiseData object to array and add slug
  const expertiseList = Object.entries(expertiseData).map(([slug, data]) => ({
    slug,
    ...data,
    // Ensure categories always exists with a default value if not present
    categories: data.categories || ['Загальні']
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique categories from expertise data
  const categories = Array.from(
    new Set(expertiseList.flatMap(expertise => expertise.categories))
  );

  // Filter expertises based on search term and selected category
  const filteredExpertises = expertiseList.filter(expertise => {
    const matchesSearch = expertise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expertise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? 
      expertise.categories.includes(selectedCategory) : 
      true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Експертизи
            </h1>
            <p className="text-lg text-gray-700">
              Ми надаємо широкий спектр експертних послуг у різних галузях. Оберіть потрібну вам експертизу з переліку нижче.
            </p>
          </div>

          {/* Search and filter section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Пошук експертизи..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Collapsible className="w-full md:w-auto">
                  <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Filter size={18} />
                    <span>Фільтр</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4 w-64">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Категорії</h3>
                      <div className="space-y-1">
                        <div 
                          className={`cursor-pointer p-2 rounded-md ${selectedCategory === null ? 'bg-brand-blue text-white' : 'hover:bg-gray-100'}`}
                          onClick={() => setSelectedCategory(null)}
                        >
                          Всі категорії
                        </div>
                        {categories.map((category, index) => (
                          <div
                            key={index}
                            className={`cursor-pointer p-2 rounded-md ${selectedCategory === category ? 'bg-brand-blue text-white' : 'hover:bg-gray-100'}`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button 
                    className={`p-2 ${viewMode === 'grid' ? 'bg-brand-blue text-white' : 'bg-white text-gray-600'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                  </button>
                  <button 
                    className={`p-2 ${viewMode === 'list' ? 'bg-brand-blue text-white' : 'bg-white text-gray-600'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results count and filtering info */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              Знайдено результатів: <span className="font-semibold">{filteredExpertises.length}</span>
              {selectedCategory && <span className="ml-2">у категорії "<span className="font-semibold">{selectedCategory}</span>"</span>}
            </div>
            {selectedCategory && (
              <button 
                className="text-brand-blue hover:underline flex items-center gap-1"
                onClick={() => setSelectedCategory(null)}
              >
                Очистити фільтр
              </button>
            )}
          </div>
          
          {/* Grid view */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExpertises.map((expertise, index) => (
                <Link 
                  key={expertise.slug}
                  to={`/ekspertyzy/${expertise.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="h-40 bg-blue-50 flex items-center justify-center p-0 overflow-hidden">
                    {expertise.backgroundImage ? (
                      <img 
                        src={expertise.backgroundImage}
                        alt={expertise.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-100 to-blue-50" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">{expertise.title.toUpperCase()}</h2>
                    <p className="text-gray-600 line-clamp-4">{expertise.description}</p>
                    <div className="mt-auto pt-2 flex justify-between items-center">
                      <span className="text-brand-blue font-medium flex items-center gap-1">
                        Детальніше <ChevronRight size={16} />
                      </span>
                      {expertise.categories.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {expertise.categories[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* List view */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {filteredExpertises.map((expertise) => (
                  <AccordionItem key={expertise.slug} value={expertise.slug} className="bg-white rounded-lg shadow-sm">
                    <AccordionTrigger className="px-4 py-4 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        {expertise.backgroundImage ? (
                          <img 
                            src={expertise.backgroundImage}
                            alt={expertise.title}
                            className="w-10 h-10 object-cover rounded-md flex-shrink-0" 
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 rounded-md flex-shrink-0" />
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{expertise.title}</h3>
                          {expertise.categories.length > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                              {expertise.categories[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-0">
                      <p className="text-gray-600 mb-4">{expertise.description}</p>
                      <div className="flex justify-between items-center">
                        <Link 
                          to={`/ekspertyzy/${expertise.slug}`}
                          className="text-brand-blue hover:underline flex items-center gap-1"
                        >
                          Детальніше <ChevronRight size={16} />
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {filteredExpertises.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 flex justify-center mb-4">
                <Search size={64} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Експертизи не знайдено</h3>
              <p className="text-gray-600">
                Спробуйте змінити параметри пошуку або зв'яжіться з нами для консультації.
              </p>
            </div>
          )}
          
          <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Не знаєте, яка експертиза вам потрібна?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Наші фахівці допоможуть обрати найбільш ефективне рішення для вашої ситуації. Зв'яжіться з нами для безкоштовної консультації.
            </p>
            <ConsultationButton size="lg" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpertisesListPage;
