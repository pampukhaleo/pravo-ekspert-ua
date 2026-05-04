import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, FileSignature, Check, ArrowRight, DollarSign } from 'lucide-react';

type ServiceVariant = 'light' | 'accent';

interface ServiceCard {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  audience: string;
  bullets: string[];
  slug: string;
  ctaLabel: string;
  variant: ServiceVariant;
}

const services: ServiceCard[] = [
  {
    id: 1,
    icon: Gavel,
    title: 'За ухвалою суду',
    audience: 'Для суддів, слідчих та органів досудового розслідування',
    bullets: [
      'Прийом ухвали суду чи постанови слідчого',
      'Виїзд експерта на об\u2019єкт дослідження',
      'Висновок експерта як доказ у справі',
    ],
    slug: 'ekspertyza-za-ukhvaloiu-sudu',
    ctaLabel: 'Деталі',
    variant: 'light',
  },
  {
    id: 2,
    icon: FileSignature,
    title: 'За заявою сторони',
    audience: 'Для адвокатів, юридичних та фізичних осіб',
    bullets: [
      'Безкоштовна консультація перед замовленням',
      'Договір та строки погоджуємо наперед',
      'Висновок експерта, що приймається судом',
    ],
    slug: 'ekspertne-doslidzhennia-za-zaiavoiu',
    ctaLabel: 'Замовити експертизу',
    variant: 'accent',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Послуги</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Два шляхи отримати експертний висновок
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Оберіть формат, який підходить саме вам — процес і результат завжди відповідають вимогам суду.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service) => {
            const isAccent = service.variant === 'accent';
            return (
              <Link
                key={service.id}
                to={`/posluhy/${service.slug}`}
                className={`group rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  isAccent
                    ? 'bg-brand-blue text-white shadow-lg hover:shadow-2xl'
                    : 'bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-lg'
                }`}
              >
                <div
                  className={`mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                    isAccent ? 'bg-white/15 text-white' : 'bg-brand-blue/10 text-brand-blue'
                  }`}
                >
                  <service.icon className="h-6 w-6" />
                </div>

                <h3 className="text-2xl font-semibold mb-1">{service.title}</h3>
                <p className={`text-sm mb-5 ${isAccent ? 'text-white/80' : 'text-gray-500'}`}>
                  {service.audience}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`h-5 w-5 mt-0.5 shrink-0 ${
                          isAccent ? 'text-white' : 'text-brand-blue'
                        }`}
                      />
                      <span className={isAccent ? 'text-white/95' : 'text-gray-700'}>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <span
                    className={`inline-flex items-center font-medium transition-transform group-hover:translate-x-1 ${
                      isAccent ? 'text-white' : 'text-brand-blue'
                    }`}
                  >
                    {service.ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/posluhy/shcho-vkhodyt-u-vartist"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue font-medium transition-colors"
          >
            <DollarSign className="h-4 w-4" />
            Дивитись, що входить у вартість
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
