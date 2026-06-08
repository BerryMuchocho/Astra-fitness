import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WorkoutHero from './components/WorkoutHero';
import MembershipPlans from './components/MembershipPlans';
import InteractiveGallery from './components/InteractiveGallery';
import FeedbackForm from './components/FeedbackForm';
import { TESTIMONIALS } from './data';
import { MembershipTier } from './types';
import { 
  Dumbbell, 
  Star, 
  MapPin, 
  Mail, 
  Globe, 
  ArrowUp,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react';

export default function App() {
  const [currentTab, setTab] = useState<'home' | 'gallery' | 'saved'>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');
  const [registrationInterest, setRegistrationInterest] = useState<string>('');

  // Testimonial scroll/carousel tracker
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(1); // Default center focus

  // Sync dark theme with HTML element class hook
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('astra_saved_workouts');
    if (saved) {
      try {
        setSavedIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save/Remove Favorite workflow (Persistent Offline Caching simulated)
  const toggleSave = (id: string) => {
    let updated: string[];
    if (savedIds.includes(id)) {
      updated = savedIds.filter(item => item !== id);
    } else {
      updated = [...savedIds, id];
    }
    setSavedIds(updated);
    localStorage.setItem('astra_saved_workouts', JSON.stringify(updated));
  };

  const handleStartJourney = () => {
    setTab('home');
    setTimeout(() => {
      const element = document.getElementById('membership-tiers');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleExploreClass = (category: string) => {
    setGalleryCategoryFilter(category);
    setTab('gallery');
  };

  const handleSelectMembershipPlan = (plan: MembershipTier) => {
    console.log(`Plan Chosen: ${plan.name}`);
    setSelectedPlanName(plan.name);
    setRegistrationInterest('');
    setTab('home');
    setTimeout(() => {
      const element = document.getElementById('access-request-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleJoinElite = () => {
    setTab('home');
    setTimeout(() => {
      const element = document.getElementById('membership-tiers');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleBookTour = () => {
    setSelectedPlanName('');
    setRegistrationInterest('Private Club Tour');
    setTab('home');
    setTimeout(() => {
      const element = document.getElementById('access-request-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-black-deep text-gray-900 dark:text-brand-gray-light font-sans transition-colors duration-200">
      
      {/* Upper Navigation Rail bar */}
      <Navbar
        currentTab={currentTab}
        setTab={setTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isOnline={isOnline}
        toggleOnline={() => setIsOnline(!isOnline)}
        savedCount={savedIds.length}
        onJoinElite={handleJoinElite}
      />

      {/* Main Tab Controller render routes */}
      {currentTab === 'home' && (
        <main className="animate-fade-in">
          {/* Main Hero and elite categories grids */}
          <WorkoutHero 
            onStartJourney={handleStartJourney}
            onExploreClass={handleExploreClass}
            onBookTour={handleBookTour}
          />


          {/* Pricing membership selection */}
          <MembershipPlans onPlanSelected={handleSelectMembershipPlan} />

          {/* Testimonial Section - "Real Results" & "JOIN THE ELITE RANK" */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-150 dark:border-brand-gray-border/25">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <div className="max-w-xl font-sans">
                <span className="text-brand-orange font-sans font-bold text-[10px] tracking-[0.35em] uppercase block mb-3">
                  Real Results
                </span>
                <h2 className="font-serif font-light text-3xl sm:text-5xl text-gray-900 dark:text-white uppercase tracking-tight">
                  Join the <span className="font-serif italic font-semibold text-brand-orange">Elite Rank</span>
                </h2>
                <div className="w-16 h-0.5 bg-brand-orange mt-5" />
              </div>

              {/* Slider Controller buttons from mockup screenshot */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrevTestimonial}
                  className="w-10 h-10 rounded-none border border-gray-300 dark:border-brand-gray-border flex items-center justify-center text-gray-700 dark:text-white hover:bg-brand-orange hover:border-brand-orange hover:text-brand-black-deep transition-all cursor-pointer bg-white/5"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="w-10 h-10 rounded-none border border-gray-300 dark:border-brand-gray-border flex items-center justify-center text-gray-700 dark:text-white hover:bg-brand-orange hover:border-brand-orange hover:text-brand-black-deep transition-all cursor-pointer bg-white/5"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrolling / focused viewport */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2 font-sans text-xs">
              {TESTIMONIALS.map((test, index) => {
                const isFocused = currentTestimonialIndex === index;
                return (
                  <div
                    key={test.id}
                    className={`p-8 rounded-none bg-gray-50 dark:bg-brand-black-card border transition-all ${
                      isFocused
                        ? 'border-brand-orange shadow-sm scale-[1.02] z-10'
                        : 'border-gray-200 dark:border-brand-gray-border/20 text-gray-800 dark:text-brand-gray-light/60 opacity-80'
                    }`}
                  >
                    {/* Stars bar */}
                    <div className="flex gap-1 mb-6 text-brand-orange">
                      {[...Array(test.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-brand-orange" />
                      ))}
                    </div>

                    <p className="font-serif italic text-[14px] text-gray-700 dark:text-brand-gray-light mb-8 leading-relaxed font-light">
                      "{test.text}"
                    </p>

                    <div className="flex items-center gap-4 font-sans">
                      <div className="w-12 h-12 rounded-none overflow-hidden border border-gray-350 dark:border-brand-gray-border/50">
                        <img 
                          className="w-full h-full object-cover" 
                          src={test.avatarUrl} 
                          alt={test.name} 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-tight">
                          {test.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-brand-gray-muted font-bold tracking-widest uppercase mt-0.5">
                          {test.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>


          {/* Submission and contact working details bar */}
          <FeedbackForm 
            selectedPlan={selectedPlanName} 
            registrationInterest={registrationInterest} 
          />
        </main>
      )}

      {currentTab === 'gallery' && (
        <InteractiveGallery
          isOnline={isOnline}
          savedIds={savedIds}
          toggleSave={toggleSave}
          filteredCategory={galleryCategoryFilter}
        />
      )}

      {currentTab === 'saved' && (
        <div className="min-h-[80vh] py-8 bg-white dark:bg-brand-black-deep text-gray-900 dark:text-brand-gray-light animate-fade-in transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 font-sans">
              <span className="text-brand-orange font-sans font-bold text-[10px] tracking-[0.35em] uppercase block mb-1">
                Persistent Offline Vault
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light text-gray-900 dark:text-white uppercase tracking-tight">
                My Bookmarked <span className="font-serif italic font-semibold text-brand-orange">Favorites</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-brand-gray-muted mt-2 leading-relaxed">
                These specific high-resolution drill cards have been saved locally in your browser memory storage and are fully accessible even without an active internet connection. Try toggling <strong>Offline Mode</strong> on the navbar to test this functionality!
              </p>
            </div>

            {savedIds.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-gray-200 dark:border-brand-gray-border/20 rounded-none max-w-xl mx-auto font-sans">
                <Heart className="w-10 h-10 text-gray-300 dark:text-brand-gray-border mx-auto mb-4 animate-pulse" />
                <h3 className="text-base font-serif font-light text-gray-700 dark:text-white uppercase mb-2 tracking-wide">No Saved Workouts</h3>
                <p className="text-xs text-gray-600 dark:text-brand-gray-light/60 max-w-xs mx-auto mb-6 font-light">
                  Select the heart bookmark toggle on training gallery card items to save them permanently to your device list.
                </p>
                <button
                  onClick={() => setTab('gallery')}
                  className="bg-brand-orange text-brand-black-deep text-xs font-sans font-bold px-6 py-3 rounded-none uppercase tracking-widest hover:bg-brand-orange-light transition-all cursor-pointer border border-brand-orange"
                >
                  Browse Vault
                </button>
              </div>
            ) : (
              <InteractiveGallery
                isOnline={true} // Force favorites to render fully unlocked regardless of simulator state!
                savedIds={savedIds}
                toggleSave={toggleSave}
                filteredCategory="All"
              />
            )}
          </div>
        </div>
      )}

      {/* Global Brand Footer */}
      <footer className="bg-gray-100 dark:bg-brand-black-deep/60 border-t border-gray-200 dark:border-brand-gray-border/20 py-16 px-4 sm:px-6 lg:px-8 text-center transition-colors">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => setTab('home')}>
            <span className="p-1.5 rounded-none bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange border border-brand-orange/25">
              <Dumbbell className="w-6 h-6" />
            </span>
            <span className="font-serif font-bold italic text-2xl tracking-tighter text-gray-900 dark:text-white uppercase">
              ASTRA<span className="text-brand-orange font-sans font-light tracking-[0.25em] text-[10px] uppercase ml-1.5 not-italic"> FITNESS</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8 text-xs font-display font-bold tracking-wider uppercase text-gray-500 dark:text-brand-gray-muted">
            <span className="hover:text-brand-orange cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-orange cursor-pointer">Terms of Service</span>
            <span className="hover:text-brand-orange cursor-pointer">Lavington Schedule FAQ</span>
          </div>

          <div className="flex gap-3 mb-8">
            <span className="w-10 h-10 border border-gray-300 dark:border-brand-gray-border/40 rounded-none flex items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-all cursor-pointer bg-white/5">
              <Globe className="w-4 h-4" />
            </span>
            <span className="w-10 h-10 border border-gray-300 dark:border-brand-gray-border/40 rounded-none flex items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-all cursor-pointer bg-white/5">
              <Mail className="w-4 h-4" />
            </span>
            <span className="w-10 h-10 border border-gray-300 dark:border-brand-gray-border/40 rounded-none flex items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-all cursor-pointer bg-white/5">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <p className="text-[11px] font-mono text-gray-400 dark:text-brand-gray-muted/50">
            © 2026 Astra Fitness. High performance starts here. Powered by Nairobi Elite Systems.
          </p>
        </div>
      </footer>

      {/* Persistent floating FAB matching request for rapid help desk details */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 font-sans text-xs">
        {/* Scroll back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-brand-orange hover:bg-brand-orange-light text-brand-black-deep rounded-none shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-brand-orange"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
