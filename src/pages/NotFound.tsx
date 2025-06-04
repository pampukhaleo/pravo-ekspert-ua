
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEO/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Помилка: Користувач спробував отримати доступ до неіснуючого маршруту:",
      location.pathname
    );
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Сторінку не знайдено | 404 | НІСЕ"
        description="Сторінка, яку ви шукаєте, не існує або була переміщена. Поверніться на головну сторінку НІСЕ."
        keywords="404, сторінка не знайдена, НІСЕ, судова експертиза"
        url={`https://expertise.com.ua${location.pathname}`}
      />
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="text-center px-4 max-w-lg mx-auto">
          <h1 className="text-6xl font-bold text-brand-blue mb-4">404</h1>
          <h2 className="text-2xl text-gray-700 mb-6">Сторінку не знайдено</h2>
          <p className="text-gray-600 mb-8">
            Сторінка, яку ви шукаєте, не існує або була переміщена. 
            Можливо, ви перейшли за застарілим посиланням або ввели неправильну адресу.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/" 
              className="btn-primary inline-block"
            >
              Повернутися на головну
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>Або перейдіть до:</p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <Link to="/ekspertyzy" className="text-blue-600 hover:underline">
                  Експертизи
                </Link>
                <Link to="/kontakty" className="text-blue-600 hover:underline">
                  Контакти
                </Link>
                <Link to="/pro-nas" className="text-blue-600 hover:underline">
                  Про нас
                </Link>
                <Link to="/novini" className="text-blue-600 hover:underline">
                  Новини
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
