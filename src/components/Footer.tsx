
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const base = import.meta.env.BASE_URL;

  return (
    <footer>
      <div className="bg-gray-900 text-white pt-16 pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="mb-6">
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src={`${base}logonise.png`}
                    alt="НІСЕ Логотип"
                    className="h-12 w-auto"
                  />
                  <h3 className="text-xl font-bold">НІСЕ</h3>
                </Link>
              </div>
              <p className="text-gray-400 mb-6">
                НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ успішно працює у сфері проведення експертизи з 2007 року.
              </p>
              <div className="flex space-x-4">
              <a href="https://www.facebook.com/nise.com.ua" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/ekspert_online/" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://t.me/ExpertOnlineUA" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.993 15.51l-.393 4.037c.564 0 .811-.244 1.112-.537l2.665-2.522 5.527 4.035c1.012.556 1.73.264 1.99-.936L23.95 4.614c.315-1.424-.516-1.977-1.47-1.636L1.588 9.285c-1.388.537-1.373 1.29-.244 1.638l5.785 1.8 13.41-8.463c.63-.39 1.21-.173.736.217l-10.5 9.033z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Швидкі посилання</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    Головна
                  </Link>
                </li>
                <li>
                  <Link to="/ekspertyzy" className="text-gray-400 hover:text-white transition-colors">
                    Експертизи
                  </Link>
                </li>
                <li>
                  <Link to="/tsiny" className="text-gray-400 hover:text-white transition-colors">
                    Наші ціни
                  </Link>
                </li>
                <li>
                  <Link to="/pro-nas" className="text-gray-400 hover:text-white transition-colors">
                    Про нас
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Послуги</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/ekspertyzy/budivelno-tekhnichna-ekspertyza" className="text-gray-400 hover:text-white transition-colors">
                    Будівельно-технічна експертиза
                  </Link>
                </li>
                <li>
                  <Link to="/ekspertyzy/zemelno-tekhnichna-ekspertyza" className="text-gray-400 hover:text-white transition-colors">
                    Земельно-технічна експертиза
                  </Link>
                </li>
                <li>
                  <Link to="/ekspertyzy/pocherkoznavcha-ekspertyza" className="text-gray-400 hover:text-white transition-colors">
                    Почеркознавча експертиза
                  </Link>
                </li>
                <li>
                  <Link to="/ekspertyzy" className="text-gray-400 hover:text-white transition-colors">
                    Всі послуги
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Контакти</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                  <div>
                    <a href="tel:+380445813090" className="text-gray-400 hover:text-white transition-colors block">
                      (044) 581 30 90
                    </a>
                    <a href="tel:+380503601682" className="text-gray-400 hover:text-white transition-colors block">
                      (050) 360 16 82
                    </a>
                    <a href="tel:+380675555222" className="text-gray-400 hover:text-white transition-colors block">
                      (067) 5555 222
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                  <a href="mailto:info@nise.com.ua" className="text-gray-400 hover:text-white transition-colors">
                    info@nise.com.ua
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">
                    04207, Україна, м. Київ, вул. Левка Лук'яненка, 21, корпус 3, офіс 7
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-black py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ. Всі права захищені.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 text-sm hover:text-gray-400">
                Політика конфіденційності
              </Link>
              <Link to="/terms" className="text-gray-500 text-sm hover:text-gray-400">
                Умови використання
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
