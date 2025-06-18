'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Add shadow on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 transition-all duration-300 ${
                scrolled ? 'shadow-md border-b border-gray-200' : ''
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center text-2xl text-gray-600">
                        <img src="/images/logo.png" alt="Logo" className="w-30 h-30" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="flex-1 justify-center text-right hidden md:flex space-x-6">
                        <ul className="flex space-x-9 items-center">
                            <li>
                                <a href="#Getstarted" className="group text-sm transition-transform transform hover:scale-105">
                                    <div className="flex justify-center mb-1">
                                        <img src="/images/shuttle.png" className="w-4 h-4 grayscale" alt="icon" />
                                    </div>
                                    <span className="relative text-gray-600 group-hover:text-black">
                                        Get Started
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded"></span>
                                    </span>
                                </a>
                            </li>

                            <li className="relative cursor-pointer" onClick={toggleDropdown}>
                                <a href="#Browse" className="group text-sm transition-transform transform hover:scale-105">
                                    <div className="flex justify-center mb-1">
                                        <img src="/images/online.png" className="w-4 h-4" alt="icon" />
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-600 group-hover:text-black">
                                        <span>Browse Navbars</span>
                                        <svg className="w-3 h-3 rotate-90" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </div>
                                </a>

                                {/* Dropdown */}
                                <div ref={dropdownRef}>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 mt-2 w-64 text-start bg-white shadow-xl rounded-md p-2 space-y-1 z-20"
                                        >
                                            <a href="#" className="flex justify-between p-3 rounded-md hover:bg-gray-100 hover:shadow transition-transform transform hover:scale-105">
                                                <div className="flex space-x-3 items-center">
                                                    <img src="/images/Tailwind CSS.png" className="w-4 h-4" />
                                                    <div className="font-medium text-sm text-gray-900">Tailwind
                                                        <div className="text-xs text-gray-500">Utility-first CSS framework.</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="flex justify-between p-3 rounded-md hover:bg-gray-100 hover:shadow transition-transform transform hover:scale-105">
                                                <div className="flex space-x-3 items-center">
                                                    <img src="/images/Bootstrap.png" className="w-4 h-4" />
                                                    <div className="font-medium text-sm text-gray-900">Bootstrap 5
                                                        <div className="text-xs text-gray-500">Responsive CSS components.</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </motion.div>
                                    )}
                                </div>
                            </li>

                            <li>
                                <a href="#Contact" className="group text-sm transition-transform transform hover:scale-105">
                                    <div className="flex justify-center mb-1">
                                        <img src="/images/contact.png" className="w-4 h-4" alt="icon" />
                                    </div>
                                    <span className="relative text-gray-600 group-hover:text-black">
                                        Contact me
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded"></span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Get Started Button */}
                    <div className="hidden md:flex ml-6">
                        <a href="#Getstarted" className="flex items-center font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105">
                            Get Started
                        </a>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="text-gray-700 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden mobile-menu"
                >
                    <ul className="flex flex-col items-center space-y-2 p-4">
                        <li className="my-2 w-full p-4 border-b border-gray-300 cursor-pointer">
                            <a href="#Getstarted" className="flex items-center space-x-2 text-sm transition-transform transform hover:scale-105">
                                <img src="/images/shuttle.png" className="w-3 h-3" />
                                <span>Get Started</span>
                            </a>
                        </li>

                        <li className="my-2 w-full p-4 border-b border-gray-300 cursor-pointer">
                            <button onClick={toggleDropdown} className="flex items-center space-x-2 text-sm w-full transition-transform transform hover:scale-105">
                                <img src="/images/online.png" className="w-3 h-3" />
                                <span>Browse Navbar</span>
                                <svg className="ml-auto w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-2 space-y-2 text-sm px-5"
                                >
                                    <li>
                                        <a href="#" className="block rounded m-2 px-4 py-2 hover:shadow hover:bg-gray-100 transition-transform transform hover:scale-105">Tailwind Navbar</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block rounded m-2 px-4 py-2 hover:shadow hover:bg-gray-100 transition-transform transform hover:scale-105">Bootstrap Navbar</a>
                                    </li>
                                </motion.ul>
                            )}
                        </li>

                        <li className="my-4">
                            <a href="#Getstarted" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105 flex items-center">
                                Get Started
                            </a>
                        </li>
                    </ul>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
