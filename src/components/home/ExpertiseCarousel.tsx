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

const expertises = [
  {
    id: 1,
    title: "Будівельно-технічна експертиза",
    description: "Будівельна експертиза дозволяє перевірити технічний стан та відповідність будівлі будівельним нормам і правилам, при аварійних пригодах (затоплення, обвал, поява тріщин, дефектів і т.п.), а також при розділі приміщень та земельних ділянок, що перебувають у власності фізичних та юридичних осіб.",
    image: "/lovable-uploads/291e2a7e-c8fd-4783-b66d-ab1590fa9a82.png",
    slug: "budivelno-tekhnichna-ekspertyza",
    keyDirections: [
      {
        title: "Оцінка збитку після залиття",
        slug: "otsinka-zbytku-pislia-zalyttia",
        description: "Експертиза збитку, нанесеного в результаті затоплення, проводиться з метою визначення вартості ремонтно-відновлювальних робіт, необхідних для відновлення приміщення або будівлі, яка постраждала від затоплення."
      },
      {
        title: "Оцінка вартості нерухомості для суду",
        slug: "otsinka-vartosti-nerukhomosti-dlia-sudu",
        description: "Фахівці Незалежного Інституту Судових Експертиз проводять експертну оцінку вартості нерухомості для суду в рамках судового провадження (як за ухвалою суду, так і за заявою сторін)."
      }
    ]
  },
  {
    id: 2,
    title: "Земельно-технічна експертиза",
    description: "Земельно-технічна експертиза необхідна при вирішенні земельних спорів, пов'язаних з розділом земельної ділянки, визначенням порядку користування земельної ділянкою, встановленням її місцезнаходження і меж, накладенням меж ділянок одна на одну, помилками в розрахунку площі та ін.",
    image: "/lovable-uploads/291e2a7e-c8fd-4783-b66d-ab1590fa9a82.png",
    slug: "zemelno-tekhnichna-ekspertyza",
    keyDirections: [
      {
        title: "Експертиза меж земельної ділянки",
        slug: "ekspertyza-mezh-zemelnoi-dilianky",
        description: "Власники земельних ділянок нерідко помиляються в своїх уявленнях про місце проходження меж їх земельних ділянок. Це може призводити до виникнення спорів щодо меж земельних ділянок між сусідами, вирішити які можна за допомогою земельно-технічної експертизи як в досудовому порядку, так і в рамках судового процесу."
      }
    ]
  }
];

const ExpertiseCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Наші експертизи</h2>
          <p className="text-xl text-gray-600">
            Професійна експертна оцінка у різних галузях
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
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                          <img 
                            src={expertise.image} 
                            alt={expertise.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="text-xl mb-2">{expertise.title}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {expertise.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseCarousel;
