'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

type CardData = {
  id: string;
  title: string;
  description: string;
  img: string;
  icon: string;
  video: string;
  badge?: string;
  code: string;
};

const cardData: CardData[] = [
  {
    id: 'dropdown-title',
    title: 'Dropdown Navbar',
    description: 'Menu that expands on click or hover to show nested options.',
    img: '/images/tutorial.png',
    icon: '/images/touch-screen.png',
    video: '/vidios/dropdown-navbar.mp4',
    badge: 'Dropdown',
    code: `<nav class="relative">
  <ul class="flex space-x-4">
    <li class="group relative">
      <button class="hover:underline">Menu</button>
      <ul class="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded">
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Item 1</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Item 2</a></li>
      </ul>
    </li>
  </ul>
</nav>`
  },
  {
    id: 'static-title',
    title: 'Static Navbar',
    description: 'Fixed in place and doesn’t move while scrolling.',
    img: '/images/tutorial.png',
    icon: '/images/touch-screen.png',
    video: '/vidios/static-navbar.mp4',
    badge: 'Static',
    code: `<nav class="bg-gray-800 p-4 text-white">
  <ul class="flex space-x-4">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>`
  },
  {
    id: 'sticky-title',
    title: 'Sticky Navbar',
    description: 'Sticks to the top while scrolling for quick access.',
    img: '/images/tutorial.png',
    icon: '/images/touch-screen.png',
    video: '/vidios/sticky-navbar.mp4',
    badge: 'Sticky',
    code: `<nav class="sticky top-0 bg-white shadow p-4">
  <ul class="flex space-x-4">
    <li><a href="#">Dashboard</a></li>
    <li><a href="#">Settings</a></li>
  </ul>
</nav>`
  },
  {
    id: 'fixed-title',
    title: 'Fixed Navbar',
    description: 'Always visible and overlays other content on scroll.',
    img: '/images/tutorial.png',
    icon: '/images/touch-screen.png',
    video: '/vidios/fixed-navbar.mp4',
    badge: 'Fixed',
    code: `<nav class="fixed top-0 left-0 w-full bg-black text-white p-4 z-50">
  <ul class="flex space-x-4">
    <li><a href="#">Portfolio</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`
  },
];

const NavbarTypesSection = () => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reset',
            once: false,
          },
        }
      );
    }

    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 100, rotate: -3 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardRefs.current[0],
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
      }
    );

    const bubbles = gsap.utils.toArray<HTMLElement>('.bubble');
    bubbles.forEach((bubble) => {
      gsap.to(bubble, {
        y: -100,
        x: () => gsap.utils.random(-30, 30),
        duration: gsap.utils.random(4, 8),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 2),
      });
    });
  }, [isClient]);

  const handleMouseEnter = async (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      try {
        await video.play();
      } catch (err) {
        console.warn('Video play error:', err);
      }
      gsap.to(cardRefs.current[index], {
        rotateX: 5,
        rotateY: -5,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video && !video.paused) {
      video.pause();
      video.currentTime = 0;
    }
    gsap.to(cardRefs.current[index], {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  const handleCloseModal = () => {
    setActiveCardId(null);
  };

  return (
    <section
      aria-labelledby="navbar-type-section"
      className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 text-white py-30 px-4"
    >
      {isClient && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="bubble absolute bg-white/10 rounded-full"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="w-full h-32 md:h-48" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,64L48,69.3C96,75,192,85,288,101.3C384,117,480,139,576,128C672,117,768,75,864,58.7C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16 px-4">
        <h2
          ref={headingRef}
          id="navbar-type-section"
          className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-pink-300"
        >
          Explore Different Navbar Styles
        </h2>
        <p className="text-lg mt-4 text-white/90 max-w-xl mx-auto">
          Discover various navbar layouts that enhance user experience and match your design needs.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="bg-white text-gray-900 shadow-xl rounded-2xl group transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col overflow-hidden"
            role="region"
            aria-labelledby={card.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
              <Image
                src={card.img}
                alt={`${card.title} preview image`}
                fill
                className="object-cover object-top z-10 transition-opacity duration-300 group-hover:opacity-0"
              />
              <div className="absolute inset-0 z-20 bg-black/40 flex flex-col items-center justify-center text-white text-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                <Image src={card.icon} alt="icon" width={28} height={28} className="w-7 h-7 mb-1" />
                <p className="text-sm font-medium">Hover to preview</p>
              </div>
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                className="absolute inset-0 w-full h-full object-cover object-top z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                muted
                playsInline
                preload="none"
                poster="/images/preview-placeholder.jpg"
              >
                <source src={card.video} type="video/mp4" />
              </video>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              {card.badge && (
                <span className="animate-pulse text-xs inline-block bg-indigo-100 text-indigo-700 font-semibold px-2 py-1 rounded-full mb-2 w-fit shadow-md">
                  {card.badge}
                </span>
              )}
              <h3 id={card.id} className="font-bold text-lg sm:text-xl mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-gray-700 flex-grow">{card.description}</p>
              <button
                className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
                onClick={() => setActiveCardId(card.id)}
              >
                View Example
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeCardId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-fadeIn">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-2 text-gray-900">
              {cardData.find((card) => card.id === activeCardId)?.title}
            </h3>
            <div className="bg-gray-900 rounded-md p-4 overflow-x-auto max-h-[400px]">
              <pre className="text-sm text-left whitespace-pre-wrap">
                <code>{cardData.find((card) => card.id === activeCardId)?.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="w-full h-32 md:h-48" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,64L48,69.3C96,75,192,85,288,101.3C384,117,480,139,576,128C672,117,768,75,864,58.7C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default NavbarTypesSection;
