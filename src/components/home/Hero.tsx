
import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

const heroGradient = "bg-gradient-to-br from-[#e2eafc] via-[#b6d0e2] to-[#346994]/60";

const Hero: React.FC = () => {
  return (
    <section className={`relative pt-32 pb-16 md:pt-40 md:pb-24 ${heroGradient} overflow-hidden`}>
      {/* Decorative blurred circle */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-[#346994]/10 rounded-full blur-3xl z-0"></div>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 animate-fade-in tracking-tight drop-shadow-lg">
            НЕЗАЛЕЖНИЙ ІНСТИТУТ <span className="text-[#346994]">СУДОВИХ ЕКСПЕРТИЗ</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-10 animate-fade-in">
            Експертиза є не лише належним доказом у судовому провадженні, але і засобом мирного врегулювання спірних питань!
          </p>
          
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-10 animate-scale-in border border-gray-200">
            <ul className="space-y-5 text-left">
              <li className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center rounded-full bg-[#346994] text-white size-9 text-lg font-semibold shadow-md">
                  1
                </span>
                <span className="text-gray-800 font-medium">Потребуєте обгрунтованих підстав для пред'явлення претензій?</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center rounded-full bg-[#346994] text-white size-9 text-lg font-semibold shadow-md">
                  2
                </span>
                <span className="text-gray-800 font-medium">Необхідно встановити причинно-наслідковий зв'язок певних подій та ситуацій?</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center rounded-full bg-[#346994] text-white size-9 text-lg font-semibold shadow-md">
                  3
                </span>
                <span className="text-gray-800 font-medium">Хочете встановити величину завданої шкоди?</span>
              </li>
            </ul>
          </div>
          
          <Link 
            to="/kontakty"
            className="inline-block px-10 py-4 text-lg rounded-full font-semibold bg-gradient-to-r from-[#346994] via-[#4a7bb6] to-[#b0c4de] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 animate-fade-in"
            style={{ letterSpacing: ".02em" }}
          >
            <Info className="inline align-middle mr-2 -mt-1" size={22} /> Отримати консультацію
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

