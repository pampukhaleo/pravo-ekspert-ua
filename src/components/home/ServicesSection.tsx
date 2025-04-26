
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Handshake, Users, ChevronRight } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: FileText,
    title: "Експертиза за ухвалою суду",
    description: "Ми проводимо експертні дослідження за ухвалою суду, виїжджаємо на об'єкти та надаємо обґрунтовані висновки.",
    slug: "ekspertyza-za-ukhvaloiu-sudu"
  },
  {
    id: 2,
    icon: Handshake,
    title: "Експертне дослідження за заявою сторін",
    description: "Проводимо незалежні експертні дослідження за заявами фізичних та юридичних осіб.",
    slug: "ekspertne-doslidzhennia-za-zaiavoiu"
  },
  {
    id: 3,
    icon: Users,
    title: "Консультація та допомога",
    description: "Надаємо професійні консультації з питань проведення експертиз та вирішення спірних ситуацій.",
    slug: "konsultatsiia-ta-dopomoha"
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Послуги</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Комплексні експертні послуги, адаптовані для вас
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            У НЕЗАЛЕЖНОМУ ІНСТИТУТІ СУДОВИХ ЕКСПЕРТИЗ ми пропонуємо широкий спектр експертних послуг, адаптованих до ваших потреб, з персоналізованою підтримкою від досвідчених експертів.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 bg-gray-100 relative">
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <service.icon className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <Link 
                  to={`/ekspertyzy/${service.slug}`} 
                  className="inline-flex items-center text-gray-900 font-medium hover:underline"
                >
                  Дізнатися більше <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/kontakty" 
            className="px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
          >
            Замовити консультацію
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
