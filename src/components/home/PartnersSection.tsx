
import React from 'react';

const partners = [
  { id: 1, img: "privat.png", name: 'privat' },
  { id: 2, img: "dominos.png", name: 'dominos' },
  { id: 3, img: "mau.png", name: 'mau' },
  { id: 4, img: "epicentr.png", name: 'epicentr' },
  { id: 5, img: "dtek.png", name: 'dtek' },
  { id: 5, img: "ukrtelekom.png", name: 'ukrtelekom' },
  { id: 5, img: "redbull.png", name: 'redbull' },
  { id: 5, img: "metro.png", name: 'metro' },
  { id: 5, img: "zytomyrenergo.png", name: 'zytomyrenergo' },
  { id: 5, img: "kyivoblenergo.png", name: 'kyivoblenergo' },
  { id: 5, img: "hersonoblenergo.png", name: 'hersonoblenergo' },
  { id: 5, img: "poltavaoblenergo.png", name: 'poltavaoblenergo' },
  { id: 5, img: "zakarpattyaoblenergo.png", name: 'zakarpattyaoblenergo' },
  { id: 5, img: "uzniyport.png", name: 'uzniyport' },

];

const PartnersSection: React.FC = () => {
  return (
    <section className="py-12 border-t border-gray-200 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">
            Нам довіряють провідні організації в галузі
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {partners.map((partner) => (
            <img src={ partner.img } alt={partner.name}/>
          )) }
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
