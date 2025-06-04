
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Youtube } from 'lucide-react';

// Sample video data - in a real app, this would come from an API
const videoRecordings = [
  {
    id: 1,
    title: 'Вебінар: Психологічна експертиза у спорах між батьками щодо виховання та місця проживання дитини',
    thumbnailUrl: 'https://img.youtube.com/vi/wb8XchP9Iz8/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/live/wb8XchP9Iz8',
    duration: '1:17:54',
    date: '20.05.2025'
  },
  {
    id: 2,
    title: 'Вебінар: Cемантико-текстуальна експертиза писемного мовлення.',
    thumbnailUrl: 'https://img.youtube.com/vi/YeVV3lGKiDA/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/live/YeVV3lGKiDA?si=NDBQdxjIRs9OfHfg',
    duration: '1:16:37',
    date: '15.04.2025'
  },
  {
    id: 3,
    title: 'Вебінар: Судово-психологічна експертиза у справах щодо відшкодування моральної шкоди',
    thumbnailUrl: 'https://img.youtube.com/vi/lX8lu41SQKY/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/live/lX8lu41SQKY',
    duration: '1:12:02',
    date: '01.04.2025'
  },
];

const VideoRecordings: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Youtube className="h-6 w-6 text-red-600 mr-2" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Відеогалерея
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Записи вебінарів
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Ми ділимося цінними знаннями з нашої експертної практики. Переглядайте записи вебінарів та лекцій НІСЕ, щоб поглибити розуміння ключових аспектів судово-експертної галузі України.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoRecordings.map(video => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                    <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">{video.title}</h3>
                  <p className="text-gray-500 text-sm">{video.date}</p>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="https://www.youtube.com/@%D0%9D%D0%B5%D0%B7%D0%B0%D0%BB%D0%B5%D0%B6%D0%BD%D0%B8%D0%B9%D0%86%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82%D0%A1%D1%83%D0%B4%D0%BE%D0%B2%D0%B8%D1%85%D0%95%D0%BA%D1%81%D0%BF%D0%B5/streams"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-900 font-medium hover:underline"
          >
            Переглянути більше на нашому YouTube каналі
            <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoRecordings;
