import React from 'react';
import { expertiseImages } from "@/assets/expertiseImages";

export const partners = [
  { id: 1, img: expertiseImages["privat.png"], name: 'privat' },
  { id: 2, img: expertiseImages["dominos.png"], name: 'dominos' },
  { id: 3, img: expertiseImages["mau.png"], name: 'mau' },
  { id: 4, img: expertiseImages["epicentr.png"], name: 'epicentr' },
  { id: 5, img: expertiseImages["dtek.png"], name: 'dtek' },
  { id: 6, img: expertiseImages["ukrtelekom.png"], name: 'ukrtelekom' },
  { id: 7, img: expertiseImages["redbull.png"], name: 'redbull' },
  { id: 8, img: expertiseImages["metro.png"], name: 'metro' },
  { id: 9, img: expertiseImages["zytomyrenergo.png"], name: 'zytomyrenergo' },
  { id: 10, img: expertiseImages["kyivoblenergo.png"], name: 'kyivoblenergo' },
  { id: 11, img: expertiseImages["hersonoblenergo.png"], name: 'hersonoblenergo' },
  { id: 12, img: expertiseImages["poltavaoblenergo.png"], name: 'poltavaoblenergo' },
  { id: 13, img: expertiseImages["zakarpattyaoblenergo.png"], name: 'zakarpattyaoblenergo' },
  { id: 14, img: expertiseImages["uzniyport.png"], name: 'uzniyport' },
];


const PartnersSection: React.FC = () => {
  return (
    <section className="py-12 border-t border-gray-200 bg-white">
      <div className="container-custom">

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">НАМ ДОВІРЯЮТЬ</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          { partners.map((partner) => (
            <img src={ partner.img } alt={ partner.name }/>
          )) }
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
