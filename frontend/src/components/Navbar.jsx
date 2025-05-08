import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-10 w-32 flex items-center"
            >
              <span className="text-white font-bold">MAKYARM</span>
            </motion.div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            {[
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
].map((item) => (
  <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
    <Link
      to={item.path}
      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {item.name}
    </Link>
  </motion.div>
))}

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/contact"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  style={{ backgroundColor: '#3AB4F2' }}
                >
                  Get Started
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-900"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ].map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      {item.name}
    </Link>
  ))}
            <Link
              to="/contact"
              className="bg-blue-500 text-white block px-3 py-2 rounded-md text-base font-medium"
              style={{ backgroundColor: '#3AB4F2' }}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
export default Navbar