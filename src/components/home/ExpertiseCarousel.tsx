import React, { useEffect, useState, useRef } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from 'react-router-dom';
import { expertiseData } from "@/data/expertiseData";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ExpertiseCarousel = () => {
  const expertises = Object.entries(expertiseData).map(([slug, data]) => ({
    id: slug,
    title: data.title,
    description: data.description,
    image: data.backgroundImage,
    slug,
    keyDirections: data.directions || [],
  }));

  const totalCount = expertises.length;

  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const autoplayRef = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", () => {
      setSnapCount(api.scrollSnapList().length);
      setSelectedIndex(api.selectedScrollSnap());
    });
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-4">ЕКСПЕРТИЗА В НІСЕ</h2>
            <p className="text-xl text-gray-600">
              Працюємо за {totalCount} напрямками судової експертизи
            </p>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/ekspertyzy">
              Усі експертизи <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="relative">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplayRef.current]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {expertises.map((expertise) => (
                <CarouselItem key={expertise.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link
                    to={`/ekspertyzy/${expertise.slug}`}
                    className="block group h-[380px] relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={expertise.image}
                      alt={`${expertise.title} - професійна судова експертиза в НІСЕ`}
                      loading="lazy"
                      width={400}
                      height={380}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                    {expertise.keyDirections.length > 0 && (
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {expertise.keyDirections.length} напрямків
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="text-xl font-semibold mb-2 leading-tight">
                        {expertise.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2 mb-3">
                        {expertise.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Детальніше <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {snapCount > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: snapCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Слайд ${i + 1}`}
                    onClick={() => api?.scrollTo(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === selectedIndex ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400 w-2"
                    )}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-center items-center mt-6 gap-4">
              <CarouselPrevious
                className="relative inset-auto h-10 px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center justify-center translate-y-0 left-0 top-0"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700 mr-1" />
                <span className="text-gray-700 text-sm font-medium">Попередня</span>
              </CarouselPrevious>

              <span className="text-sm text-gray-500 tabular-nums min-w-[60px] text-center">
                {selectedIndex + 1} / {totalCount}
              </span>

              <CarouselNext
                className="relative inset-auto h-10 px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center justify-center translate-y-0 right-0 top-0"
              >
                <span className="text-gray-700 text-sm font-medium">Наступна</span>
                <ChevronRight className="w-4 h-4 text-gray-700 ml-1" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseCarousel;
