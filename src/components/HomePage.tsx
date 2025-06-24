'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const wavePath1 = "M0,600 Q360,700 720,600 T1440,600 V800 H0 Z";
const wavePath2 = "M0,500 Q360,600 720,500 T1440,500 V800 H0 Z";
const wavePath3 = "M0,400 Q360,500 720,400 T1440,400 V800 H0 Z";

const HomePage = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path');
    if (paths) {
      gsap.to(paths[0], {
        attr: { d: wavePath2 },
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(paths[1], {
        attr: { d: wavePath3 },
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5
      });

      gsap.to(paths[2], {
        attr: { d: wavePath1 },
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
      });
    }

    if (svgRef.current) {
      gsap.to(svgRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (textContentRef.current) {
      gsap.fromTo(
        textContentRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textContentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reset',
          }
        }
      );
    }
  }, []);

  return (
    <div className="flex items-center py-12 px-6 transition-colors duration-300 bg-white mt-10">
      <div className="container mx-auto max-w-[1200px] flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

        {/* Text Content */}
        <div ref={textContentRef} className="flex-1 max-w-xl text-center md:text-left text-gray-900">
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-4 inline-block">
            #1 Navbar Component Library
          </span>

          <h1 className="font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl relative z-10 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Build Powerful Navbar Components
            </span>
          </h1>

          <p className="text-gray-600 max-w-lg text-base sm:text-lg md:text-xl mx-auto md:mx-0">
            Responsive navigation bars effortlessly with our modern navbar component
            library. Reusable, customizable, and developer-friendly.
          </p>

          <form className="mt-8 flex flex-col sm:flex-row items-center max-w-md mx-auto md:mx-0 relative space-y-2 sm:space-y-0 sm:space-x-2">
            <label htmlFor="search" className="sr-only">Search Navbar</label>

            <div className="relative w-full flex-grow">
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Search Navbar..."
                autoComplete="off"
                className="w-full px-3 py-2 pl-9 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black rounded-md border border-gray-300"
              />
              <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="button"
              className="border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Browse
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-3">
            Explore 10+ fully customizable navbars instantly.
          </p>
        </div>

        {/* Image & SVG Waves */}
        <div className="relative w-full max-w-sm md:w-[400px] h-[400px] rounded-2xl overflow-hidden hidden md:flex justify-end mt-10">
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0f2fe" /> {/* light blue */}
                <stop offset="100%" stopColor="#ede9fe" /> {/* light violet */}
              </linearGradient>
              <radialGradient id="spotlight" cx="70%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff55" />
                <stop offset="100%" stopColor="#ffffff00" />
              </radialGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#gradient)" />
            <rect width="100%" height="100%" fill="url(#spotlight)" />
            <path d={wavePath1} fill="rgba(99, 102, 241, 0.08)" />
            <path d={wavePath2} fill="rgba(139, 92, 246, 0.1)" />
            <path d={wavePath3} fill="rgba(255, 255, 255, 0.15)" />
          </svg>

          <Image
            src="/images/3d.png"
            alt="3D Navbar Illustration"
            className="relative z-10 max-w-full h-auto object-contain select-none drop-shadow-2xl transition-transform duration-300 hover:scale-105"
            loading="lazy"
            draggable="false"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
