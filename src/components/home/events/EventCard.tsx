
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface EventProps {
  event: {
    id: number;
    title: string;
    date: Date;
    time: string;
    link: string;
    description: string;
  };
  toggleCalendar?: () => void;
}

const EventCard: React.FC<EventProps> = ({ event, toggleCalendar }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/5">
        <div className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col justify-center items-center">
          <div className="text-2xl font-bold text-blue-600">
            {format(event.date, 'd')}
          </div>
          <div className="text-md font-medium">
            {format(event.date, 'MMMM yyyy')}
          </div>
          <div className="mt-1 text-gray-600 text-sm">
            {event.time}
          </div>
        </div>
      </div>
      
      <div className="md:w-4/5">
        <h3 className="text-2xl font-bold mb-3 text-gray-900">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-6">
          {event.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <a 
            href={event.link} 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Зареєструватися
          </a>
          {toggleCalendar && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={toggleCalendar}
            >
              Переглянути всі події
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
