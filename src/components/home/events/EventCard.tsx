
import React from 'react';
import { format } from 'date-fns';

interface EventProps {
  event: {
    id: number;
    title: string;
    date: Date;
    time: string;
    link: string;
    description: string;
  };
}

const EventCard: React.FC<EventProps> = ({ event }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-2/5">
        <div className="bg-white rounded-lg p-6 shadow-md h-full">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {format(event.date, 'd')}
          </div>
          <div className="text-lg font-medium">
            {format(event.date, 'MMMM yyyy')}
          </div>
          <div className="mt-2 text-gray-600">
            {event.time}
          </div>
        </div>
      </div>
      
      <div className="md:w-3/5">
        <h3 className="text-2xl font-bold mb-3 text-gray-900">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-6">
          {event.description}
        </p>
        <a 
          href={event.link} 
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          Зареєструватися
        </a>
      </div>
    </div>
  );
};

export default EventCard;
