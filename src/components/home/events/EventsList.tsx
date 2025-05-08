
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  link: string;
  description: string;
}

interface EventsListProps {
  selectedDateEvents: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ selectedDateEvents }) => {
  if (selectedDateEvents.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        На цю дату немає запланованих заходів
      </p>
    );
  }

  return (
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
  );
};

export default EventsList;
