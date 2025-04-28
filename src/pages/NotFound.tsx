
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Помилка: Користувач спробував отримати доступ до неіснуючого маршруту:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-brand-blue mb-4">404</h1>
          <p className="text-2xl text-gray-700 mb-6">Сторінку не знайдено</p>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Сторінка, яку ви шукаєте, не існує або була переміщена.
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-block"
          >
            Повернутися на головну
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
