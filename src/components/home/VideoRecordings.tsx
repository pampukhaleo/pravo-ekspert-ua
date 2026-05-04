import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Youtube } from 'lucide-react';
import {
  videoRecordings,
  getThumbnailUrl,
  getVideoUrl,
  YOUTUBE_CHANNEL_URL,
} from '@/data/videos';

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
            <Card key={video.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <a
                href={getVideoUrl(video.youtubeId)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Дивитись відео: ${video.title}`}
                className="block"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={getThumbnailUrl(video.youtubeId)}
                    alt={video.title}
                    width={480}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors" aria-hidden="true">
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
                  <time dateTime={video.isoDate} className="text-gray-500 text-sm">
                    {video.date}
                  </time>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href={YOUTUBE_CHANNEL_URL}
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
