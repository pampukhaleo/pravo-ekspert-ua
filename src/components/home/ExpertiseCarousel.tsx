import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { expertiseData } from "@/data/expertiseData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExpertiseCarousel = () => {
  // Перетворюємо об'єкт expertiseData на масив
  const expertises = Object.entries(expertiseData).map(([slug, data]) => ({
    id: slug,
    title: data.title,
    description: data.description,
    image: data.backgroundImage,
    slug: slug,
    keyDirections: data.directions || [] // Add fallback for missing directions
  }));

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">ЕКСПЕРТИЗА В НІСЕ</h2>
          <p className="text-xl text-gray-600">
            Працюємо за більш ніж 20-ма напрямками та спеціальностями
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {expertises.map((expertise) => (
                <CarouselItem key={expertise.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link to={`/ekspertyzy/${expertise.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                      <CardHeader className="p-0">
                        <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                          <img 
                            src={expertise.image} 
                            alt={expertise.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="text-xl mb-2 text-center">{expertise.title.toUpperCase()}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {expertise.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center items-center mt-10 gap-4">
              <CarouselPrevious 
                className="relative inset-auto h-12 px-6 py-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-gray-700 font-medium">Попередня</span>
              </CarouselPrevious>
              
              <CarouselNext 
                className="relative inset-auto h-12 px-6 py-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center justify-center"
              >
                <span className="text-gray-700 font-medium">Наступна</span>
                <ChevronRight className="w-5 h-5 text-gray-700 ml-2" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseCarousel;
