'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast, { Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  "YofamoThemes helped me build faster and better UI — highly recommended!",
  "Super clean components! It's a game-changer for my design process.",
  "Easy to integrate and saved me hours of coding. Love it!",
];

const Footer = () => {
  const footerRef = useRef(null);
  const testimonialRef = useRef<HTMLParagraphElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialRef.current) {
        gsap.to(testimonialRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
            gsap.to(testimonialRef.current, { opacity: 1, duration: 0.5 });
          },
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address!');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmail('');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        toast.success('🎉 Subscribed successfully!');
      } else {
        toast.error(data.message || 'Subscription failed!');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />

      <footer
        ref={footerRef}
        className="bg-gradient-to-b from-transparent to-gray-100 py-14 border-t border-gray-300"
      >
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h2 className="text-gray-800 font-semibold mb-4">Menu</h2>
              <ul className="space-y-2">
                {['Get Started', 'Browse Navbar', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 hover:underline transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-gray-800 font-semibold mb-4">Stay Updated</h2>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 text-white rounded-full transition duration-300 flex items-center justify-center ${
                    loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-900 hover:scale-105'
                  }`}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-gray-800 font-semibold mb-4 flex justify-center md:justify-end">Follow Us</h2>
              <div className="flex justify-center md:justify-end space-x-4 text-gray-600">
                <a href="#" className="hover:text-indigo-600 transition transform hover:scale-110"><FaInstagram size={20} /></a>
                <a href="#" className="hover:text-indigo-600 transition transform hover:scale-110"><FaTiktok size={20} /></a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-center md:text-left mt-8">
            <div>
              <h3 className="text-gray-800 font-semibold mb-2">Our Location</h3>
              <p className="text-gray-600">Batu, Indonesia</p>
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold mb-2">What Users Say</h3>
              <p ref={testimonialRef} className="italic text-gray-500 text-sm transition-opacity duration-500">
                {testimonials[testimonialIndex]}
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-sm text-center mt-10">
            &copy; 2025 Navstack — Designed by{' '}
            <a href="#" className="underline hover:text-indigo-600">YofamoThemes</a>.
          </p>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition">
          Chat Support
        </a>
      </div>
    </>
  );
};

export default Footer;
