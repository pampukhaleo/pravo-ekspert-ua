import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const whiteBackgroundRoutes = ['/ekspertyzy', '/kontakty', '/tsiny', '/pro-nas'];
  const isExactWhiteBgPage = whiteBackgroundRoutes.includes(location.pathname);

  const headerClasses = isExactWhiteBgPage
    ? 'bg-white shadow-md py-3'
    : scrolled || isOpen
      ? 'bg-white shadow-md py-3'
      : 'bg-transparent py-5';

  const textClasses = isExactWhiteBgPage || scrolled || isOpen
    ? 'text-gray-900'
    : 'text-white';


  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const navItems = [
    { name: 'Експертизи', path: '/ekspertyzy' },
    { name: 'Наші ціни', path: '/tsiny' },
    { name: 'Контакти', path: '/kontakty' },
    { name: 'Про нас', path: '/pro-nas' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={ `w-full fixed top-0 left-0 z-50 transition-all duration-300 ${ headerClasses }` }>
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className={ `font-bold text-xl md:text-2xl ${ textClasses }` }>НІСЕ</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            { navItems.map((item) => (
              <Link
                key={ item.name }
                to={ item.path }
                className={ `text-base font-medium transition-colors ${
                  isActive(item.path) ? 'font-bold' : ''
                } ${ textClasses }` }
              >
                { item.name }
              </Link>
            )) }
            <Link
              to="/kontakty"
              className={ `px-5 py-2 rounded-md font-medium transition-colors ${
                isExactWhiteBgPage || scrolled || isOpen
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }` }
            >
              Замовити консультацію
            </Link>
          </div>

          <button
            onClick={ toggleMenu }
            className="md:hidden focus:outline-none"
            aria-label={ isOpen ? "Close menu" : "Open menu" }
          >
            { isOpen ? (
              <X className={ `h-6 w-6 ${ textClasses }` }/>
            ) : (
              <Menu className={ `h-6 w-6 ${ textClasses }` }/>
            ) }
          </button>
        </nav>

        { isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-md">
            <div className="flex flex-col p-4 space-y-4">
              { navItems.map((item) => (
                <Link
                  key={ item.name }
                  to={ item.path }
                  className={ `text-base font-medium transition-colors py-2 ${
                    isActive(item.path) ? 'text-gray-900' : 'text-gray-600'
                  }` }
                >
                  { item.name }
                </Link>
              )) }
              <Link
                to="/kontakty"
                className="px-5 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors text-center mt-4"
              >
                Замовити консультацію
              </Link>
            </div>
          </div>
        ) }
      </div>
    </header>
  );
};

export default Navbar;
