
import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // Якщо немає питань, не відображаємо розділ
  if (!faqs || faqs.length === 0) {
    return null;
  }
  
  return (
    <section className="py-10 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">НАЙЧАСТІШЕ ЗАДАВАНІ ПИТАННЯ</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                className={`w-full text-left p-4 flex justify-between items-center font-medium text-gray-900 focus:outline-none`}
                onClick={() => toggleQuestion(index)}
              >
                <span>{faq.question}</span>
                <span className="text-brand-blue text-xl">{activeIndex === index ? '−' : '+'}</span>
              </button>
              
              {activeIndex === index && (
                <div className="p-4 pt-0 text-gray-700 border-t border-gray-100">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
