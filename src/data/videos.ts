export interface Video {
  id: number;
  title: string;
  youtubeId: string;
  duration: string;
  date: string;     // "17.06.2025"
  isoDate: string;  // "2025-06-17"
}

export const videoRecordings: Video[] = [
  {
    id: 1,
    title:
      'Вебінар на тему: «Особливості проведення товарознавчої експертизи щодо визначення вартості товарів»',
    youtubeId: 'HtC3b0nJQfc',
    duration: '1:04:46',
    date: '17.06.2025',
    isoDate: '2025-06-17',
  },
  {
    id: 2,
    title:
      'Відкритий ефір у форматі питання–відповідь з Геннадієм Геннадійовичем Пампухою',
    youtubeId: 'eqzygdHoV14',
    duration: '1:06:11',
    date: '12.06.2025',
    isoDate: '2025-06-12',
  },
  {
    id: 3,
    title:
      'Вебінар: Психологічна експертиза у спорах між батьками щодо виховання та місця проживання дитини',
    youtubeId: 'wb8XchP9Iz8',
    duration: '1:17:54',
    date: '20.05.2025',
    isoDate: '2025-05-20',
  },
];

export const getThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

export const getVideoUrl = (youtubeId: string) =>
  `https://youtube.com/live/${youtubeId}`;

export const YOUTUBE_CHANNEL_URL =
  'https://www.youtube.com/@%D0%9D%D0%B5%D0%B7%D0%B0%D0%BB%D0%B5%D0%B6%D0%BD%D0%B8%D0%B9%D0%86%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82%D0%A1%D1%83%D0%B4%D0%BE%D0%B2%D0%B8%D1%85%D0%95%D0%BA%D1%81%D0%BF%D0%B5/streams';