
import React from 'react';

const testimonials = [
  { 
    id: 1, 
    name: "Віктор Петренко", 
    position: "CEO, Будівельна компанія",
    content: "Їх увага до деталей та прихильність до надання видатних результатів мала значення. Я не міг бути щасливішим з результатом.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  { 
    id: 2, 
    name: "Олена Коваль", 
    position: "Керуючий партнер",
    content: "Професійно, надійно та орієнтовано на результат. Настійно рекомендую їх послуги!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg" 
  },
  { 
    id: 3, 
    name: "Михайло Ткач", 
    position: "Власник юридичної фірми",
    content: "Я відчув підтримку на кожному кроці. Вони справді розуміють потреби своїх клієнтів.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg" 
  },
];

const ClientsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Репутація, побудована на результатах.
            <br />
            <span className="text-gray-600 font-normal">Відгуки від наших цінних партнерів.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 text-lg italic mb-4">"{testimonial.content}"</p>
                  <p className="text-gray-900 font-medium">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.position}</p>
                </div>
              </div>
              <div className="mt-auto">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjI1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMCA1YzAgLTUgLTEwIDUgLTEwIDEwIiBzdHJva2U9IiM3Nzc3NzciIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgLz48L3N2Zz4=" 
                  alt="Підпис" 
                  className="h-12 opacity-70"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Часті запитання</h3>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="border-b border-gray-200">
              <button className="flex justify-between items-center w-full py-5 text-left focus:outline-none">
                <span className="text-lg font-medium text-gray-900">Як розпочати співпрацю?</span>
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="border-b border-gray-200">
              <button className="flex justify-between items-center w-full py-5 text-left focus:outline-none">
                <span className="text-lg font-medium text-gray-900">Які ваші тарифи?</span>
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="border-b border-gray-200">
              <button className="flex justify-between items-center w-full py-5 text-left focus:outline-none">
                <span className="text-lg font-medium text-gray-900">Як довго триває експертиза?</span>
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
