import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from './events/EventCard';
import CalendarView from './events/CalendarView';
import { events, getNextEvent } from './events/eventsData';
import { useStructuredData } from '../../hooks/useStructuredData';

const EventsCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const { getEventData } = useStructuredData();
  
  // Get the next upcoming event - only if it's in the future
  const nextEvent = getNextEvent();
  const today = new Date();
  const hasUpcomingEvents = nextEvent && new Date(nextEvent.date) > today;
  
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Generate structured data for upcoming events
  const eventsStructuredData = events
    .filter(event => new Date(event.date) > new Date())
    .slice(0, 3) // Limit to next 3 events
    .map(event => getEventData(
      event.title,
      event.description,
      event.date.toISOString(), // Convert Date to string
      undefined, // endDate
      event.type === 'webinar', // isOnline
      event.price || "Безкоштовно"
    ));

  // Add structured data to page head if there are events
  React.useEffect(() => {
    if (eventsStructuredData.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(eventsStructuredData);
      script.id = 'events-structured-data';
      
      // Remove existing script if any
      const existingScript = document.getElementById('events-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
      
      document.head.appendChild(script);
      
      return () => {
        const scriptToRemove = document.getElementById('events-structured-data');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [eventsStructuredData]);
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="mb-8">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Календар
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Заходи НІСЕ
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Долучайтесь до наших вебінарів та семінарів, щоб залишатися в центрі актуальних змін у сфері судових експертиз.
            Слідкуйте за нашими анонсами, аби не пропустити важливі експертні дискусії разом із провідними фахівцями галузі.
          </p>
        </div>

        {hasUpcomingEvents && (
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-10 shadow-sm">
            <EventCard event={nextEvent} toggleCalendar={toggleCalendar} showCalendar={showCalendar} />
          </div>
        )}

        {!hasUpcomingEvents && (
          <div className="mb-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 md:p-10 shadow-sm text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Заходи планується
            </h3>
            <p className="text-gray-600 mb-6">
              Наразі немає запланованих заходів. Слідкуйте за оновленнями, щоб не пропустити наступні вебінари та семінари.
            </p>
            <button
              onClick={toggleCalendar}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              {showCalendar ? 'Сховати календар' : 'Переглянути календар'}
            </button>
          </div>
        )}
        
        {showCalendar && <CalendarView events={events} date={date} setDate={setDate} />}
      </div>
    </section>
  );
};

export default EventsCalendar;
