
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from './events/EventCard';
import CalendarView from './events/CalendarView';
import { events, getNextEvent } from './events/eventsData';

const EventsCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Get the next upcoming event
  const nextEvent = getNextEvent();
  
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="mb-8">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Календар
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Майбутні заходи
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Приєднуйтесь до наших вебінарів та інформаційних заходів, щоб бути в курсі останніх тенденцій у сфері експертиз.
          </p>
        </div>

        {nextEvent && (
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-10 shadow-sm">
            <EventCard event={nextEvent} toggleCalendar={toggleCalendar} />
          </div>
        )}
        
        <div className="flex justify-center">
          <Button
            onClick={toggleCalendar}
            variant="outline"
            className="flex items-center gap-2"
          >
            <CalendarIcon className="h-5 w-5" />
            {showCalendar ? 'Сховати календар' : 'Переглянути всі події'}
          </Button>
        </div>
        
        {showCalendar && <CalendarView events={events} date={date} setDate={setDate} />}
      </div>
    </section>
  );
};

export default EventsCalendar;
