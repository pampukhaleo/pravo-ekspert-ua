
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Експертизи', path: '/ekspertyzy' },
    { name: 'Наші ціни', path: '/tsiny' },
    { name: 'Контакти', path: '/kontakty' },
    { name: 'Про нас', path: '/pro-nas' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-brand-blue font-bold text-xl md:text-2xl">НІСЕ</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-base font-medium transition-colors hover:text-brand-blue ${
                  isActive(item.path) ? 'text-brand-blue' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/kontakty" 
              className="btn-primary"
            >
              Зв'язатися з нами
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-brand-blue" />
            ) : (
              <Menu className="h-6 w-6 text-brand-blue" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white absolute left-0 right-0 top-full shadow-md">
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-base font-medium transition-colors hover:text-brand-blue py-2 ${
                    isActive(item.path) ? 'text-brand-blue' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/kontakty" 
                className="btn-primary text-center mt-4"
              >
                Зв'язатися з нами
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
