import React, { useState, useEffect, useRef } from 'react';
import { Award, Flame, Dumbbell, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { LUXURY_HERO_SLIDES } from '../data';

interface WorkoutHeroProps {
  onStartJourney: () => void;
  onExploreClass: (category: string) => void;
  onBookTour: () => void;
}

export default function WorkoutHero({ onStartJourney, onExploreClass, onBookTour }: WorkoutHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Autoplay handler with pause capability
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % LUXURY_HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Touch handlers for mobile swipe guestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swipe left -> Next slide
      setCurrentImageIndex((prev) => (prev + 1) % LUXURY_HERO_SLIDES.length);
    } else if (diff < -50) {
      // Swipe right -> Prev slide
      setCurrentImageIndex((prev) => (prev === 0 ? LUXURY_HERO_SLIDES.length - 1 : prev - 1));
    }
    setTouchStartX(null);
  };

  return (
    <div className="bg-brand-black-deep text-white transition-colors duration-200">
      
      {/* Luxury Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[78vh] flex items-center px-4 sm:px-6 lg:px-8 py-8 overflow-hidden bg-brand-black-deep">
        
        {/* Tesla meets Equinox Depth Effects */}
        <div className="absolute top-[20%] left-[10%] w-[380px] h-[380px] bg-brand-gold/8 blur-[130px] rounded-full pointer-events-none z-[1]" />
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-white/[0.015] blur-[150px] rounded-full pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_65%)] pointer-events-none z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-black-deep via-brand-black-deep/60 to-transparent pointer-events-none z-[2]" />
        
        {/* Left Side Translucent Athlete Background Image */}
        <div className="absolute left-[4%] sm:left-[6%] lg:left-[10%] xl:left-[12%] top-0 bottom-0 w-full lg:w-[58%] xl:w-[52%] pointer-events-none overflow-hidden z-[1] hidden lg:block">
          <img
            className="w-full h-full object-cover object-right opacity-[0.15] filter brightness-75 grayscale contrast-125 translate-x-12 lg:translate-x-16"
            alt="Focused athletic training silhouette background"
            src="/src/assets/images/luxury_athlete_strength.png"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlays to blend the image seamlessly into the dark backdrop */}
          <div className="absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-brand-black-deep via-brand-black-deep/80 to-transparent z-[2]" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-brand-black-deep z-[2]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-black-deep to-transparent z-[2]" />
        </div>
        
        {/* CAROUSEL SLIDESHOW (Background on mobile, right-side box on desktop) */}
        <div 
          className="absolute inset-0 z-[2] w-full h-full lg:inset-auto lg:right-8 xl:right-16 lg:top-1/2 lg:-translate-y-1/2 lg:w-[360px] xl:w-[420px] lg:aspect-square lg:z-20 lg:border lg:border-brand-gray-border/40 lg:shadow-2xl lg:bg-brand-black-card overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {LUXURY_HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentImageIndex;
            return (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <img
                  className={`w-full h-full object-cover ${isActive ? 'animate-luxury-zoom' : ''}`}
                  alt={slide.alt}
                  src={slide.url}
                  referrerPolicy="no-referrer"
                />
                {/* Soft black vignette/overlay directly on image to let captions stand out */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-[2]" />
                
                {/* Slide captions */}
                <div className={`absolute bottom-12 lg:bottom-10 left-6 lg:left-8 z-10 transition-all duration-700 delay-300 transform ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <span className="text-brand-gold font-sans font-bold text-[9px] sm:text-[10px] tracking-[0.3em] uppercase block mb-1.5 drop-shadow-sm">
                    {slide.caption}
                  </span>
                  <p className="text-gray-300 font-sans text-[11px] sm:text-xs font-light tracking-widest uppercase">
                    {slide.mood}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Desktop Slide Navigation Arrows (Hidden on Mobile) */}
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? LUXURY_HERO_SLIDES.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-brand-black-deep/70 text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-black-deep transition-all border border-brand-gold/20 opacity-0 group-hover:opacity-100 cursor-pointer text-sm font-light hidden lg:flex"
            aria-label="Previous Slide"
          >
            &larr;
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % LUXURY_HERO_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-brand-black-deep/70 text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-black-deep transition-all border border-brand-gold/20 opacity-0 group-hover:opacity-100 cursor-pointer text-sm font-light hidden lg:flex"
            aria-label="Next Slide"
          >
            &rarr;
          </button>
          
          {/* Indicator dots for sliding carousel */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-brand-black-deep/75 backdrop-blur-sm px-3 py-1.5 border border-brand-gray-border/40">
            {LUXURY_HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-1.5 h-1.5 rounded-none transition-all duration-300 cursor-pointer ${
                  index === currentImageIndex 
                    ? 'bg-brand-gold w-6' 
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Full-width backdrop darkness filter overlays */}
          <div className="absolute inset-0 bg-black/65 lg:hidden z-[1]" />
        </div>

        {/* CONTENT COLUMN CONTAINER */}
        <div className="max-w-7xl mx-auto w-full relative z-20 flex items-center pointer-events-none">
          <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col justify-center text-left py-12 lg:py-0 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[8.5px] font-bold tracking-[0.25em] uppercase mb-4 rounded-none self-start">
              <span>( 01 / ELITE CLUB )</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold inline-block animate-pulse" />
              <span>Lavington, Nairobi</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tighter text-white mb-4 uppercase flex flex-col items-start gap-1">
              <span className="flex items-center gap-3">
                TRAIN
                <span className="inline-block bg-brand-gold text-brand-black-deep px-3 py-1 text-xs sm:text-sm font-display font-black tracking-tight uppercase rotate-2">
                  BETTER
                </span>
              </span>
              <span className="text-brand-gold font-serif font-light italic tracking-tight lowercase">
                live better
              </span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-brand-gray-light/85 max-w-xs sm:max-w-md mb-6 leading-relaxed font-light">
              World-class training, recovery, and wellness spaces just minutes from home
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartJourney}
                className="bg-brand-gold hover:bg-brand-gold-light text-brand-black-deep font-sans font-bold text-[11px] tracking-[0.2em] px-6 py-3 rounded-none hover:scale-[1.01] active:scale-[0.99] transition-all uppercase text-center cursor-pointer border border-brand-gold shadow-lg shadow-brand-gold/10"
              >
                JOIN ASTRA ELITE
              </button>
              <button
                onClick={onBookTour}
                className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black-deep bg-transparent font-sans font-bold text-[11px] tracking-[0.2em] px-6 py-3 rounded-none hover:scale-[1.01] active:scale-[0.99] transition-all uppercase text-center cursor-pointer"
              >
                BOOK A PRIVATE TOUR
              </button>
            </div>

            {/* Elegant Luxury Social Proof Scrolling Ribbon */}
            <div className="mt-8 pt-5 border-t border-brand-gray-border/40 overflow-hidden relative w-full pointer-events-none">
              {/* Fade masks to blend ribbon edges with the dark background */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-brand-black-deep to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-brand-black-deep to-transparent z-10" />
              
              <div className="flex w-max items-center animate-marquee whitespace-nowrap text-[9px] sm:text-[10px] font-display font-black tracking-[0.2em] text-brand-gray-light/65 uppercase py-1">
                {/* First Set of Items */}
                <span className="mx-6">200+ Members</span>
                <span className="text-brand-gold font-serif mx-2">//</span>
                <span className="mx-6">4.9★ Rating</span>
                <span className="text-brand-gold font-serif mx-2">//</span>
                <span className="mx-6">15 Elite Coaches</span>
                <span className="text-brand-gold font-serif mx-2">//</span>
                <span className="mx-6">State-of-the-Art Facilities</span>
                <span className="text-brand-gold font-serif mx-2">//</span>

                {/* Second Set of Items for Seamless Wrapping */}
                <span className="mx-6">200+ Members</span>
                <span className="text-brand-gold font-serif mx-2">//</span>
                <span className="mx-6">4.9★ Rating</span>
                <span className="text-brand-gold font-serif mx-2">//</span>
                <span className="mx-6">15 Elite Coaches</span>
                <span className="text-brand-gold font-serif mx-2">//</span>
                <span className="mx-6">State-of-the-Art Facilities</span>
                <span className="text-brand-gold font-serif mx-2">//</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Elite Programming Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-150 dark:border-brand-gray-border/25">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-sans font-bold text-[10px] tracking-[0.35em] uppercase block mb-3">
            Elite Classes &amp; Drills
          </span>
          <h2 className="font-serif font-light text-3xl sm:text-5xl text-gray-900 dark:text-white uppercase tracking-tight">
            Train Like An <span className="font-serif italic font-semibold text-brand-orange">Athlete</span>
          </h2>
          <div className="w-12 h-[2px] bg-brand-orange mx-auto mt-4" />
        </div>

        {/* 12-Column Layout Bento Grid conforming to layout guide */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* HIIT & Performance Section Card - span 8 */}
          <div className="col-span-12 md:col-span-8 group relative h-[380px] bg-gray-100 dark:bg-brand-black-card border border-gray-200 dark:border-brand-gray-border/30 rounded-none overflow-hidden transition-all hover:border-brand-orange">
            <img
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-95 dark:brightness-75 group-hover:scale-105"
              alt="High intensity air bike session with athletes in Lavington"
              src="/src/assets/images/assault_bikes_class.jpg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <span className="inline-flex items-center gap-1.5 self-start bg-brand-orange text-brand-black-deep text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-none mb-3">
                <Flame className="w-3 h-3" /> High Octane
              </span>
              <h3 className="font-serif font-light text-2xl text-white mb-2 uppercase">
                HIIT &amp; <span className="font-serif italic font-normal text-brand-orange">Performance</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-xl font-light">
                Maximum output metabolic training formats structured to shred visceral body fat and forge bulletproof cardiovascular engines.
              </p>
              <button
                onClick={() => onExploreClass('HIIT')}
                className="mt-4 text-brand-orange text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 hover:text-brand-orange-light transition-colors cursor-pointer"
              >
                View Sessions <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Strength - span 4 */}
          <div className="col-span-12 md:col-span-4 group relative h-[380px] bg-gray-100 dark:bg-brand-black-card border border-gray-200 dark:border-brand-gray-border/30 rounded-none overflow-hidden transition-all hover:border-brand-orange">
            <img
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-95 dark:brightness-70 group-hover:scale-105"
              alt="Elite strength training with personal coach form support"
              src="/src/assets/images/shoulder_press_coaching_side.jpg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 flex flex-col justify-end">
              <span className="inline-flex items-center gap-1.5 self-start bg-brand-orange-dark text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-none mb-3">
                <Dumbbell className="w-3 h-3" /> Power Lifts
              </span>
              <h3 className="font-serif font-light text-2xl text-white mb-2 uppercase">
                Strength <span className="font-serif italic font-normal text-brand-orange">Athletics</span>
              </h3>
              <p className="text-gray-300 text-xs font-light">
                Scientific weightlifting layouts and hypertrophy protocols prioritizing mechanical load.
              </p>
              <button
                onClick={() => onExploreClass('Strength')}
                className="mt-4 text-brand-orange text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 hover:text-brand-orange-light transition-colors cursor-pointer"
              >
                View Strength <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Yoga & Recovery - span 4 / 350px height */}
          <div className="col-span-12 md:col-span-4 h-[350px] bg-gray-50 dark:bg-brand-black-card border border-gray-200 dark:border-brand-gray-border/30 rounded-none p-8 flex flex-col justify-between transition-all hover:border-brand-orange">
            <div>
              <span className="inline-flex p-3 rounded-none bg-brand-orange/10 text-brand-orange mb-6 border border-brand-orange/20">
                <HeartHandshake className="w-5 h-5" />
              </span>
              <h3 className="font-serif font-light text-xl text-gray-900 dark:text-white uppercase mb-3">
                Yoga &amp; <span className="font-serif italic font-semibold text-brand-orange">Decompression</span>
              </h3>
              <p className="text-gray-600 dark:text-brand-gray-light/70 text-xs leading-relaxed font-light">
                Advanced structural mobility classes, neuromuscular restoration work, and hot-cold recovery cycles formatted for joint longevity.
              </p>
            </div>

            <button
              onClick={() => onExploreClass('Yoga')}
              className="text-brand-orange text-[10px] font-sans font-bold tracking-[0.2em] uppercase flex items-center gap-1.5 hover:text-brand-orange-light transition-colors mt-4 self-start cursor-pointer"
            >
              EXPLORE RECOVERY <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Open Gym - span 8 */}
          <div className="col-span-12 md:col-span-8 group relative h-[350px] bg-gray-100 dark:bg-brand-black-card border border-gray-200 dark:border-brand-gray-border/30 rounded-none overflow-hidden transition-all hover:border-brand-orange">
            <img
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-95 dark:brightness-70 group-hover:scale-105"
              alt="Altitude-controlled cardio treadmill zone"
              src="/src/assets/images/treadmill_cardio.jpg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent p-6 sm:p-8 flex flex-col justify-center">
              <h3 className="font-serif font-light text-2xl text-white mb-2 uppercase">
                Open Gym <span className="font-serif italic font-normal text-brand-orange">Access</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-xs leading-relaxed font-light">
                24/7/365 availability to the world's finest training lines, resistance arrays, and Olympic rigs.
              </p>
              <button
                onClick={() => onExploreClass('Open Gym')}
                className="mt-4 text-brand-orange text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 hover:text-brand-orange-light transition-colors self-start cursor-pointer"
              >
                Access Details <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
