
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Sample event data - in a real app, this would come from an API
const events = [
  { 
    id: 1, 
    title: 'Вебінар: Будівельно-технічна експертиза',
    date: new Date(2025, 4, 25), // May 25, 2025
    time: '14:00',
    link: '#',
    description: 'Детальний огляд процедур та методів будівельно-технічної експертизи від провідних експертів НІСЕ.'
  },
  { 
    id: 2, 
    title: 'Вебінар: Оціночна експертиза',
    date: new Date(2025, 5, 18), // June 18, 2025
    time: '11:00',
    link: '#',
    description: 'Актуальні методи та підходи до оціночної експертизи майна та нерухомості.'
  },
  { 
    id: 3, 
    title: 'Презентація нових послуг',
    date: new Date(2025, 5, 22), // June 22, 2025
    time: '15:30',
    link: '#',
    description: 'Ознайомлення з новими експертними послугами НІСЕ та їхніми перевагами для клієнтів.'
  }
];

const EventsCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Sort events by date (ascending)
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Find the next upcoming event
  const today = new Date();
  const nextEvent = sortedEvents.find(event => event.date >= today) || sortedEvents[0];
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  // Dates that have events
  const eventDates = events.map(event => event.date);
  
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
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/5">
                <div className="bg-white rounded-lg p-6 shadow-md h-full">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {format(nextEvent.date, 'd')}
                  </div>
                  <div className="text-lg font-medium">
                    {format(nextEvent.date, 'MMMM yyyy')}
                  </div>
                  <div className="mt-2 text-gray-600">
                    {nextEvent.time}
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/5">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {nextEvent.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {nextEvent.description}
                </p>
                <a 
                  href={nextEvent.link} 
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  Зареєструватися
                </a>
              </div>
            </div>
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
        
        {showCalendar && (
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
                
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map(event => (
                      <Card key={event.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-2">Час: {event.time}</p>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          <a 
                            href={event.link} 
                            className="inline-block text-blue-600 font-medium hover:underline"
                          >
                            Зареєструватися
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    На цю дату немає запланованих заходів
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link 
            to="/zakhodi"
            className="text-blue-600 font-medium hover:underline flex items-center justify-center gap-2"
          >
            Переглянути архів заходів
            <CalendarIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
