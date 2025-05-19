
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Handshake, DollarSign, ChevronRight } from 'lucide-react';

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
    icon: DollarSign,
    title: "Що входить у вартість",
    description: "Докладний перелік послуг та робіт, які включені у вартість проведення експертизи.",
    slug: "shcho-vkhodyt-u-vartist"
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
            <Link 
              key={service.id}
              to={`/posluhy/${service.slug}`}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="p-6 h-full flex flex-col">
                <div
                  className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-brand-blue">
                  <service.icon className="h-5 w-5"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{ service.title }</h3>
                <p className="text-gray-600 mb-5">{ service.description }</p>

                <div className="mt-auto">
                  <span className="inline-flex items-center text-brand-blue font-medium group-hover:underline">
                    Дізнатися більше <ChevronRight className="ml-1 h-4 w-4"/>
                  </span>
                </div>
              </div>

            </Link>
          )) }
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/kontakty"
            className="px-6 py-3 bg-brand-blue text-white rounded-md font-medium hover:bg-brand-dark transition-colors inline-flex items-center"
          >
            Замовити консультацію
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
