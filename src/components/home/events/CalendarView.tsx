
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import EventsList from './EventsList';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  link: string;
  description: string;
}

interface CalendarViewProps {
  events: Event[];
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, date, setDate }) => {
  // Dates that have events
  const eventDates = events.map(event => event.date);
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  return (
    <div className="mt-8 flex flex-col lg:flex-row items-start gap-10">
      <div className="w-full lg:w-1/2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            eventDay: (day) => eventDates.some(eventDate => 
              eventDate.getDate() === day.getDate() && 
              eventDate.getMonth() === day.getMonth() && 
              eventDate.getFullYear() === day.getFullYear()
            )
          }}
          modifiersStyles={{
            eventDay: {
              fontWeight: 'bold',
              color: '#4a90e2',
              textDecoration: 'underline'
            }
          }}
        />
      </div>
      
      <div className="w-full lg:w-1/2">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="mb-6 flex items-center">
            <CalendarIcon className="mr-3 h-6 w-6 text-gray-700" />
            <h3 className="font-medium text-xl">
              {date ? format(date, 'd MMMM yyyy') : 'Виберіть дату'}
            </h3>
          </div>
          
          <EventsList selectedDateEvents={selectedDateEvents} />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
