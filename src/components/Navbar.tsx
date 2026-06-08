import React, { useState } from 'react';
import { Menu, X, Dumbbell, Sun, Moon, Wifi, WifiOff, Heart } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'gallery' | 'saved';
  setTab: (tab: 'home' | 'gallery' | 'saved') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isOnline: boolean;
  toggleOnline: () => void;
  savedCount: number;
  onJoinElite: () => void;
}

export default function Navbar({
  currentTab,
  setTab,
  isDarkMode,
  toggleDarkMode,
  isOnline,
  toggleOnline,
  savedCount,
  onJoinElite
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: 'home' | 'gallery' | 'saved') => {
    setTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-brand-black-deep/90 backdrop-blur-md border-b border-gray-200 dark:border-brand-gray-border/40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Gym Name */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleTabClick('home')}>
            <span className="p-1.5 rounded-none bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange border border-brand-orange/25">
              <Dumbbell className="w-4 h-4" />
            </span>
            <span className="font-serif font-bold italic text-2xl tracking-tighter text-gray-900 dark:text-white">
              Astra<span className="text-brand-orange font-sans font-light tracking-[0.25em] text-[10px] uppercase ml-1.5 not-italic">Fitness</span>
            </span>
          </div>

          {/* Desktop Controls & Tabs */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleTabClick('home')}
              className={`font-sans text-[11px] font-bold tracking-[0.2em] uppercase transition-all py-1.5 border-b ${
                currentTab === 'home'
                  ? 'border-brand-orange text-brand-orange'
                  : 'border-transparent text-gray-500 dark:text-brand-gray-muted hover:text-brand-orange dark:hover:text-brand-orange'
              }`}
            >
              Explore Club
            </button>
            <button
              onClick={() => handleTabClick('gallery')}
              className={`font-sans text-[11px] font-bold tracking-[0.2em] uppercase transition-all py-1.5 border-b ${
                currentTab === 'gallery'
                  ? 'border-brand-orange text-brand-orange'
                  : 'border-transparent text-gray-500 dark:text-brand-gray-muted hover:text-brand-orange dark:hover:text-brand-orange'
              }`}
            >
              Training Vault
            </button>
            <button
              onClick={() => handleTabClick('saved')}
              className={`relative font-sans text-[11px] font-bold tracking-[0.2em] uppercase transition-all py-1.5 border-b ${
                currentTab === 'saved'
                  ? 'border-brand-orange text-brand-orange'
                  : 'border-transparent text-gray-500 dark:text-brand-gray-muted hover:text-brand-orange dark:hover:text-brand-orange'
              }`}
            >
              Saved ({savedCount})
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-2 flex h-1.5 w-1.5">
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-orange shadow-sm opacity-90"></span>
                </span>
              )}
            </button>

            {/* Simulated Online/Offline Toggle */}
            <div className="h-4 w-px bg-gray-200 dark:bg-brand-gray-border" />

            <button
              onClick={toggleOnline}
              title={isOnline ? "Simulate Going Offline" : "Simulate Going Online"}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-none text-[9px] tracking-wider uppercase font-bold cursor-pointer transition-all ${
                isOnline
                  ? 'bg-green-500/10 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-500/25'
                  : 'bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange border border-brand-orange/25'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-none ${isOnline ? 'bg-green-500' : 'bg-brand-orange animate-pulse'}`}></div>
              <span>{isOnline ? 'Offline Access Ready' : 'Simulating Offline'}</span>
            </button>

            {/* Dark Mode selector */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-none bg-gray-50 dark:bg-brand-black-card border border-gray-200 dark:border-brand-gray-border/50 text-gray-600 dark:text-brand-gray-light hover:text-brand-orange dark:hover:text-brand-orange transition-colors cursor-pointer"
              aria-label="Toggle Night Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onJoinElite}
              className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black-deep text-[10px] font-sans font-bold px-4 py-2 rounded-none tracking-widest uppercase transition-all duration-200 cursor-pointer"
            >
              Join Elite
            </button>
          </div>

          {/* Mobile controllers right side */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Quick Network Status Info */}
            <button
              onClick={toggleOnline}
              className={`p-1.5 rounded-lg border ${
                isOnline
                  ? 'text-green-500 border-green-500/20 bg-green-500/5'
                  : 'text-amber-500 border-amber-500/30 bg-amber-500/10'
              }`}
            >
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </button>

            {/* Dark Mode info */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg text-gray-500 dark:text-brand-gray-light bg-gray-100 dark:bg-brand-black-card border border-transparent dark:border-brand-gray-border/20"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-gray-700 dark:text-brand-gray-light hover:text-brand-orange transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-brand-black-card border-b border-gray-200 dark:border-brand-gray-border/50 animate-fade-in py-4 px-4 transition-all col-span-2">
          <div className="flex flex-col gap-3 font-sans">
            <button
              onClick={() => handleTabClick('home')}
              className={`text-left text-xs font-bold tracking-widest uppercase py-2.5 px-3 rounded-none transition-colors border-l-2 ${
                currentTab === 'home'
                  ? 'bg-brand-orange/10 text-brand-orange border-brand-orange'
                  : 'text-gray-700 dark:text-brand-gray-light hover:bg-gray-100 dark:hover:bg-brand-black-deep border-transparent'
              }`}
            >
              Explore Club
            </button>
            <button
              onClick={() => handleTabClick('gallery')}
              className={`text-left text-xs font-bold tracking-widest uppercase py-2.5 px-3 rounded-none transition-colors border-l-2 ${
                currentTab === 'gallery'
                  ? 'bg-brand-orange/10 text-brand-orange border-brand-orange'
                  : 'text-gray-700 dark:text-brand-gray-light hover:bg-gray-100 dark:hover:bg-brand-black-deep border-transparent'
              }`}
            >
              Training Vault
            </button>
            <button
              onClick={() => handleTabClick('saved')}
              className={`text-left text-xs font-bold tracking-widest uppercase py-2.5 px-3 rounded-none transition-colors flex justify-between items-center border-l-2 ${
                currentTab === 'saved'
                  ? 'bg-brand-orange/10 text-brand-orange border-brand-orange'
                  : 'text-gray-700 dark:text-brand-gray-light hover:bg-gray-100 dark:hover:bg-brand-black-deep border-transparent'
              }`}
            >
              <span>Saved Offline Favorites</span>
              <span className="bg-brand-orange text-brand-black-deep text-[10px] px-2 py-0.5 rounded-none font-sans font-bold">
                {savedCount}
              </span>
            </button>

            <div className="h-px bg-gray-200 dark:bg-brand-gray-border/50 my-1" />

            {/* Offline Test Simulator Callout inside mobile menu */}
            <div className="p-3 bg-gray-50 dark:bg-brand-black-deep/50 rounded-none border border-gray-200 dark:border-brand-gray-border/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold text-gray-500 dark:text-brand-gray-muted tracking-[0.2em] uppercase">Network Status Simulator</span>
                <span className={`h-2 w-2 rounded-none ${isOnline ? 'bg-green-500' : 'bg-brand-orange'} animate-pulse`} />
              </div>
              <p className="text-[11px] text-gray-600 dark:text-brand-gray-light/60 mb-2">
                Toggle below to mimic low-connectivity conditions for saved photos.
              </p>
              <button
                onClick={toggleOnline}
                className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-none text-[10px] uppercase tracking-wider font-bold cursor-pointer border ${
                  isOnline
                    ? 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400'
                    : 'bg-brand-orange/10 text-brand-orange border-brand-orange/20 dark:bg-brand-orange/20 dark:text-brand-orange'
                }`}
              >
                {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                <span>{isOnline ? 'Connected: Switch to Offline' : 'Offline Mode: Switch to Live'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                onJoinElite();
                setMobileMenuOpen(false);
              }}
              className="bg-brand-gold text-brand-black-deep text-center font-sans font-bold text-xs py-3 rounded-none tracking-widest uppercase cursor-pointer border border-brand-gold hover:bg-brand-gold-light transition-all duration-200"
            >
              Start Journey Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
