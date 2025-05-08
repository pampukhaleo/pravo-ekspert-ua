
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from 'lucide-react';

// Sample event data - in a real app, this would come from an API
const events = [
  { 
    id: 1, 
    title: 'Вебінар: Будівельно-технічна експертиза',
    date: new Date(2025, 5, 15),
    time: '14:00',
    link: '#'
  },
  { 
    id: 2, 
    title: 'Вебінар: Оціночна експертиза',
    date: new Date(2025, 5, 18),
    time: '11:00',
    link: '#'
  },
  { 
    id: 3, 
    title: 'Презентація нових послуг',
    date: new Date(2025, 5, 22),
    time: '15:30',
    link: '#'
  }
];

const EventsCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  // Dates that have events
  const eventDates = events.map(event => event.date);
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          <div className="w-full lg:w-1/2">
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
                  {date ? date.toLocaleDateString('uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }) : 'Виберіть дату'}
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
      </div>
    </section>
  );
};

export default EventsCalendar;
