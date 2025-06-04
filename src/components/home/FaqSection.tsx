
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';
import { useStructuredData } from '../../hooks/useStructuredData';

const faqs = [
  {
    question: "Як розпочати співпрацю з вашим інститутом?",
    answer: "Для початку співпраці з Незалежним Інститутом Судових Експертиз, вам необхідно зв'язатися з нашими фахівцями за телефоном або через форму на сайті. Після цього ми проконсультуємо вас щодо необхідних документів та подальших кроків."
  },
  {
    question: "Які документи потрібні для проведення експертизи?",
    answer: "Перелік необхідних документів залежить від типу експертизи. Загалом, потрібно надати документи, що підтверджують право власності, технічну документацію, а також додаткові матеріали відповідно до конкретної справи. Детальний перелік ви отримаєте під час консультації з нашими фахівцями."
  },
  {
    question: "Скільки коштують ваші послуги?",
    answer: "Вартість послуг залежить від типу експертизи, складності випадку та обсягу необхідних досліджень. Ми пропонуємо конкурентні ціни на ринку та індивідуальний підхід до кожного клієнта. Для отримання точної інформації про вартість, звертайтеся до нас на консультацію."
  },
  {
    question: "Які терміни проведення експертизи?",
    answer: "Терміни проведення експертизи залежать від її типу, складності, кількості питань на дослідження, обсягу документів тощо. В середньому, експертиза в НІСЕ проводиться від 10 днів. Точні терміни ми погоджуємо з клієнтом індивідуально під час оформлення заявки з після ознайомлення з матеріалами та фабулою справи."
  },
  {
    question: "Чи маєте ви відповідні ліцензії та сертифікати?",
    answer: "Так, Незалежний Інститут Судових Експертиз має всі необхідні ліцензії та сертифікати для проведення експертиз різних типів. Наші експерти є сертифікованими спеціалістами з багаторічним досвідом роботи в галузі."
  },
  {
    question: "Чи проводите ви експертизи за ухвалою суду?",
    answer: "Так, ми проводимо експертизи на підставі ухвали суду з усіх видів експертиз, що входять до нашої компетенції. Наші висновки відповідають всім вимогам законодавства та приймаються судами як належні докази."
  },
  {
    question: "Чи експерти НІСЕ атестовані Мін'юстом?",
    answer: "Експерти Незалежного інституту судових експертиз атестовані Міністерством юстиції України та внесені до Реєстру атестованих судових експертів. \n" +
      "\n" +
      "Вони проводять експертизи відповідно до:\n" +
      "- Закону України «Про судову експертизу»;\n" +
      "- Інструкції № 53/5 «Про призначення та проведення судових експертиз та експертних досліджень»;\n" +
      "- Інструкції № 3505/5 «Про затвердження Інструкції про особливості здійснення судово‑експертної діяльності атестованими судовими експертами, що не працюють у державних спеціалізованих експертних установах»;\n" +
      "- статей 242–244 Кримінального процесуального кодексу України."
  }
];

const FaqSection: React.FC = () => {
  const { getFAQData } = useStructuredData();

  // Генеруємо структуровані дані для FAQ
  const faqStructuredData = getFAQData(
    faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  );

  return (
    <section className="py-16 md:py-24">
      {/* Додаємо FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>
      
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-6 w-6 text-gray-700 mr-2" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Відповіді на запитання
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Часті запитання
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Знайдіть відповіді на найпоширеніші запитання про наші послуги та процес проведення експертиз.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left text-gray-900 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Не знайшли відповіді на своє запитання?</p>
          <Link 
            to="/kontakty"
            className="px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
          >
            Зв'яжіться з нами
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
