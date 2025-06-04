import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { Mail, Phone, MapPin } from 'lucide-react';
import Map from '../components/Map';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from '../components/SEO/SEOHead';
import { useStructuredData } from '../hooks/useStructuredData';

const ContactPage = () => {
  const { toast } = useToast();
  const { getOrganizationData, getLocalBusinessData, getBreadcrumbData, getContactPointData } = useStructuredData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    expertise: 'Не обрано'
  });
  
  const combinedStructuredData = [
    getOrganizationData(),
    getLocalBusinessData(),
    getContactPointData(),
    getBreadcrumbData([
      { name: "Головна", url: "https://nise.com.ua" },
      { name: "Контакти", url: "https://nise.com.ua/kontakty" }
    ])
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          ...formData,
          companyName: 'NISE'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Повідомлення надіслано",
        description: "Дякуємо за звернення! Ми зв'яжемося з вами найближчим часом.",
        variant: "default",
        duration: 5000,
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        expertise: 'Не обрано'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося надіслати повідомлення. Будь ласка, спробуйте пізніше.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: "Контакти", isCurrentPage: true }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Контакти | НІСЕ"
        description="Зв'яжіться з Незалежним Інститутом Судових Експертиз для консультації або замовлення експертизи. Телефони, адреса, електронна пошта."
        keywords="контакти НІСЕ, телефон експертиза, адреса НІСЕ, консультація експерта, замовити експертизу"
        url="https://nise.com.ua/kontakty"
        structuredData={combinedStructuredData}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Контакти
            </h1>
            <p className="text-lg text-gray-700">
              Зв'яжіться з нами для консультації або замовлення експертизи
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Наші контакти</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-brand-blue mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Телефон</h3>
                      <p className="text-gray-700">(044) 581 30 90</p>
                      <p className="text-gray-700">(050) 360 16 82</p>
                      <p className="text-gray-700">(067) 5555 222</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-brand-blue mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-700">info@nise.com.ua</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-brand-blue mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Адреса</h3>
                      <p className="text-gray-700">04207, Україна, м. Київ, вул. Левка Лук'яненка, 21, корпус 3, офіс 7</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Наше розташування</h2>
                <Map />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Форма зворотного зв'язку</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Ім'я *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="expertise" className="block text-gray-700 font-medium mb-2">Тип експертизи</label>
                  <select
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Не обрано">Оберіть тип експертизи</option>
                    <option value="Будівельно-технічна">Будівельно-технічна</option>
                    <option value="Оціночна">Оціночна</option>
                    <option value="Земельна">Земельна</option>
                    <option value="Почеркознавча">Почеркознавча</option>
                    <option value="Економічна">Економічна</option>
                    <option value="Інша">Інша</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Повідомлення *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-brand-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Надсилання...' : 'Надіслати'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
