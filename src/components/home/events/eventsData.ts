
// Sample event data - in a real app, this would come from an API
export interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  link: string;
  description: string;
}

export const events: Event[] = [
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

// Find the next upcoming event
export const getNextEvent = () => {
  const today = new Date();
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  return sortedEvents.find(event => event.date >= today) || sortedEvents[0];
};
