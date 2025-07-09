import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useStructuredData } from '../../hooks/useStructuredData';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs = [] }) => {
  const { getFAQData } = useStructuredData();
  
  // Якщо немає питань, не відображаємо розділ
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Генеруємо структуровані дані для FAQ
  const faqStructuredData = getFAQData(
    faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  );
  
  return (
    <section className="py-10 bg-gray-50">
      {/* Додаємо FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ {
          __html: JSON.stringify(faqStructuredData)
        } }
      />

      <div className="container-custom">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">НАЙЧАСТІШЕ ЗАДАВАНІ ПИТАННЯ</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border border-gray-200 rounded-lg overflow-hidden bg-white mb-4">
              <AccordionTrigger className="px-4 py-3 font-medium text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
