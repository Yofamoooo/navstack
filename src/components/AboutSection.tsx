'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Animasi Register
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  const whyRef = useRef(null);
  const whyHeadingRef = useRef(null);
  const whyListRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const statsRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ABOUT SECTION
      gsap.fromTo(contentRef.current, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(headingRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, delay: 0.2, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(textRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, delay: 0.4, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(buttonRef.current, { opacity: 0, y: 30, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, delay: 0.6, duration: 0.8, ease: 'power1.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(iconRef.current, { opacity: 0, rotate: -45 }, {
        opacity: 1, rotate: 0, delay: 0.2, duration: 1, ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(statsRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, delay: 0.7, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      });

      // WHY NAVSTACK
      gsap.fromTo(whyHeadingRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: whyRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(whyListRef.current, { opacity: 0, x: -50 }, {
        opacity: 1, x: 0, delay: 0.3, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: whyRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(imageWrapperRef.current, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, delay: 0.5, duration: 1, ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: whyRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(quoteRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, delay: 0.5, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: whyRef.current,
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-screen w-full flex justify-center items-center px-4 overflow-hidden bg-transparent">
        <article ref={contentRef} className="p-8 sm:p-10 lg:p-14 flex flex-col items-center text-center space-y-6 sm:space-y-8 z-10" aria-labelledby="about-navstack-heading">
          <span className="text-sm text-blue-600 font-medium tracking-wide">Simple. Fast. Customizable.</span>
          <div ref={iconRef} aria-hidden="true" className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-full h-full mx-auto">
              <circle cx="12" cy="12" r="10" />
              <polygon points="12 6 15 12 12 18 9 12 12 6" />
            </svg>
          </div>
          <h2 id="about-navstack-heading" ref={headingRef} className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">About NavStack</h2>
          <p ref={textRef} className="max-w-3xl text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed">
            NavStack provides ready-to-use navbar components and high-quality design templates built with
            Tailwind CSS 4 or Bootstrap 5. Whether you’re building a simple site or a complex web application,
            our responsive navigation solutions enhance your UI and increase development speed.
          </p>
          <a ref={buttonRef} href="#Getstarted" className="inline-block bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold px-8 py-2 rounded-xl shadow-lg hover:brightness-110 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base sm:text-lg lg:text-xl">
            Explore Navbars
          </a>
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">100+</p>
              <p className="text-sm text-gray-500">Navbar Components</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-violet-600">2</p>
              <p className="text-sm text-gray-500">Frameworks Supported</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">Fast</p>
              <p className="text-sm text-gray-500">Copy & Paste Ready</p>
            </div>
          </div>
        </article>
      </section>

      <section ref={whyRef} className="h-full md:h-screen flex justify-center items-start bg-white">
        <article className="p-5 sm:p-10 lg:p-14 flex flex-col md:flex-row items-center gap-10" aria-labelledby="why-navstack-heading">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h3 ref={whyHeadingRef} id="why-navstack-heading" className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Why Choose NavStack?
            </h3>
            <ul ref={whyListRef} className="list-disc list-inside text-gray-600 space-y-3 text-base sm:text-lg lg:text-xl leading-relaxed">
              <li>Fully customizable navbar components for every use case</li>
              <li>Modern design built with Tailwind CSS 4 and Bootstrap 5</li>
              <li>Responsive, accessible, and performance-optimized code</li>
              <li>Regularly updated with the latest best practices</li>
              <li>Ideal for developers who need efficient UI building blocks</li>
              <li>Easy to copy and download</li>
            </ul>
            <blockquote ref={quoteRef} className="border-l-4 pl-4 text-gray-500 italic mt-6">
              “NavStack saved us hours of navbar development and looks amazing out of the box.”<br />
              <span className="text-sm text-gray-400">— Alex, Frontend Dev</span>
            </blockquote>
          </div>
          <figure ref={imageWrapperRef} className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-2xl shadow-lg overflow-hidden aspect-[4/3] transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/bg1.png"
              alt="Illustration of modern web navigation design"
              width={600}
              height={450}
              className="w-full h-full object-cover object-center"
              priority
            />
          </figure>
        </article>
      </section>
    </>
  );
};

export default AboutPage;
