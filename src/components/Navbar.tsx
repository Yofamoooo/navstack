'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Home,
  Layers,
  Phone,
} from 'lucide-react';

const Navbar = () => {
  const [frameworks, setFrameworks] = useState<{
    name: string;
    icon: string;
    description: string;
  }[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileSearchTerm, setMobileSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleMobileDropdown = () => setIsMobileDropdownOpen((prev) => !prev);

  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/frameworks');
        const data = await res.json();
        setFrameworks(data);
      } catch (error) {
        console.error('Failed to fetch frameworks:', error);
      }
    };

    fetchFrameworks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isDropdownOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-[9999]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 transition-all duration-300 ${
          scrolled ? 'shadow-md border-b border-gray-200' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center text-2xl text-gray-800 font-bold">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-30 h-30 mr-2"
                loading="lazy"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <motion.a
                whileHover="hover"
                href="#Getstarted"
                className="relative flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 font-medium transition group"
              >
                <Home className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition" />
                Get Started
              </motion.a>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="relative flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 font-medium group"
                >
                  <Layers className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition" />
                  Browse Navbars
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-[400px] max-h-[400px] overflow-auto bg-white shadow-xl rounded-xl p-4 z-30"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search frameworks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full mb-4 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        {frameworks
                          .filter((item) =>
                            item.name.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((item) => (
                            <a
                              key={item.name}
                              href={`#${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="flex gap-3 p-3 hover:bg-gray-100 rounded-lg transition transform hover:scale-[1.02]"
                            >
                              <img
                                src={`/images/${item.icon}`}
                                alt={item.name}
                                className="w-5 h-5 mt-1"
                                loading="lazy"
                              />
                              <div>
                                <div className="font-medium text-sm text-gray-900">{item.name}</div>
                                <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                              </div>
                            </a>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.a
                whileHover="hover"
                href="#Contact"
                className="relative flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 font-medium transition group"
              >
                <Phone className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition" />
                Contact
              </motion.a>

              <a
                href="#Getstarted"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm shadow-md font-medium transition"
              >
                Get Started
              </a>
            </div>

            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMobileMenu}
                className="text-gray-700"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white px-6 py-6 space-y-5 border-t border-gray-200"
            >
              <a
                href="#Getstarted"
                className="flex items-center gap-2 text-gray-800 font-medium text-base hover:text-indigo-600 transition"
              >
                <Home size={18} />
                Get Started
              </a>

              <div>
                <button
                  onClick={toggleMobileDropdown}
                  className="flex items-center justify-between w-full text-gray-800 font-medium text-base hover:text-indigo-600"
                >
                  <span className="flex items-center gap-2">
                    <Layers size={18} />
                    Browse Navbars
                  </span>
                  {isMobileDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <AnimatePresence>
                  {isMobileDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 space-y-2 pl-3 border-l border-gray-300"
                    >
                      <input
                        type="text"
                        placeholder="Search frameworks..."
                        value={mobileSearchTerm}
                        onChange={(e) => setMobileSearchTerm(e.target.value)}
                        className="w-full mb-3 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      {frameworks
                        .filter((item) =>
                          item.name.toLowerCase().includes(mobileSearchTerm.toLowerCase())
                        )
                        .map((item) => (
                          <a
                            key={item.name}
                            href={`#${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm text-gray-600 hover:text-indigo-500 transition"
                          >
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-2">
                              {item.description}
                            </div>
                          </a>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#Contact"
                className="flex items-center gap-2 text-gray-800 font-medium text-base hover:text-indigo-600 transition"
              >
                <Phone size={18} />
                Contact
              </a>

              <a
                href="#Getstarted"
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow"
              >
                Get Started
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
