
// Sample event data - in a real app, this would come from an API
export interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  link: string;
  description: string;
  type?: 'webinar' | 'seminar' | 'conference';
  price?: string;
}

export const events: Event[] = [
  { 
    id: 1, 
    title: 'Вебінар: Судово-психологічна експертиза у спорах між батьками щодо виховання та місця проживання дитини',
    date: new Date(2025, 4, 20),
    time: '16:00',
    link: 'https://wep.wf/palpnh',
    description: 'Вебінар присвячений особливостям проведення судово-психологічної експертизи у справах щодо місця проживання дитини та участі батьків у її вихованні. Учасники дізнаються, які матеріали потрібні для експертизи, як правильно організувати взаємодію з дитиною, батьками та адвокатами, як оцінити психологічний клімат у сім\'ї, а також які етичні виклики виникають у роботі експерта.',
    type: 'webinar',
    price: 'Безкоштовно'
  },
];

// Find the next upcoming event
export const getNextEvent = () => {
  const today = new Date();
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  return sortedEvents.find(event => event.date >= today) || sortedEvents[0];
};
