
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">НІСЕ</h3>
            <p className="text-gray-300 mb-4">
              НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ успішно працює у сфері проведення експертизи з 2007 року.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Наші послуги</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ekspertyzy" className="text-gray-300 hover:text-white transition-colors">
                  Експертизи
                </Link>
              </li>
              <li>
                <Link to="/tsiny" className="text-gray-300 hover:text-white transition-colors">
                  Наші ціни
                </Link>
              </li>
              <li>
                <Link to="/pro-nas" className="text-gray-300 hover:text-white transition-colors">
                  Про нас
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Контакти</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+380123456789" className="text-gray-300 hover:text-white transition-colors">
                  +38 (012) 345-67-89
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@example.com" className="text-gray-300 hover:text-white transition-colors">
                  info@example.com
                </a>
              </li>
              <li className="mt-2">
                <Link to="/kontakty" className="text-brand-blue hover:text-brand-light transition-colors">
                  Наша адреса
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Посилання</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kontakty" className="text-gray-300 hover:text-white transition-colors">
                  Зв'язатися з нами
                </Link>
              </li>
              <li>
                <Link to="/pro-nas" className="text-gray-300 hover:text-white transition-colors">
                  Наша команда
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
