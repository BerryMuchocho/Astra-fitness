import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem, SearchRecord } from '../types';
import { 
  Search, 
  RefreshCw, 
  Heart, 
  ZoomIn, 
  ZoomOut, 
  X, 
  WifiOff, 
  SlidersHorizontal,
  History,
  Trash2,
  Clock,
  Sparkles,
  Fingerprint
} from 'lucide-react';

interface InteractiveGalleryProps {
  isOnline: boolean;
  savedIds: string[];
  toggleSave: (id: string) => void;
  filteredCategory?: string;
}

export default function InteractiveGallery({
  isOnline,
  savedIds,
  toggleSave,
  filteredCategory = 'All'
}: InteractiveGalleryProps) {
  // Query state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recentSearches, setRecentSearches] = useState<SearchRecord[]>([]);
  
  // Swipe to Refresh gesture states
  const [pullYStart, setPullYStart] = useState<number | null>(null);
  const [pullOffset, setPullOffset] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  // Zoom lightbox states
  const [activeZoomItem, setActiveZoomItem] = useState<GalleryItem | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [zoomPan, setZoomPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  
  // Pinch gesture states
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState<number>(1);

  // References
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Synchronize category selection if triggered from home page clicks
  useEffect(() => {
    if (filteredCategory && filteredCategory !== 'All') {
      setSelectedCategory(filteredCategory);
    }
  }, [filteredCategory]);

  // Load auto-saved recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('astra_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Handle Search trigger and auto-save query
  const triggerSearchSave = (queryStr: string) => {
    const trimmed = queryStr.trim();
    if (!trimmed) return;
    
    // Check if query already exists in recent history to avoid double records
    const existing = recentSearches.find(s => s.query.toLowerCase() === trimmed.toLowerCase());
    if (existing) return;

    const newRecord: SearchRecord = {
      id: `sr-${Date.now()}`,
      query: trimmed,
      timestamp: Date.now()
    };
    const updated = [newRecord, ...recentSearches].slice(0, 5); // Kept to 5 recent queries
    setRecentSearches(updated);
    localStorage.setItem('astra_recent_searches', JSON.stringify(updated));
  };

  // Keyboard capture or trigger on form submits
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerSearchSave(searchQuery);
    }
  };

  // Clear specific auto-save search item
  const clearSearchItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s.id !== id);
    setRecentSearches(updated);
    localStorage.setItem('astra_recent_searches', JSON.stringify(updated));
  };

  // Clear entire search database
  const clearAllSearchLogs = () => {
    setRecentSearches([]);
    localStorage.removeItem('astra_recent_searches');
  };

  // Gesture: Pull-To-Refresh Touch Logic
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isRefreshing) return;
    
    // Check if gallery component scroll view is fully scrolled to the top
    const container = scrollRef.current;
    if (container && container.scrollTop === 0) {
      setPullYStart(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (pullYStart === null || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const offset = currentY - pullYStart;

    if (offset > 0) {
      // Apply linear damping on pull resistance so user feels the weight
      const dampedOffset = Math.min(offset * 0.45, 95);
      setPullOffset(dampedOffset);
      
      // Prevent browser default scroll bounce when dragging the reload pulley
      if (dampedOffset > 5) {
        if (e.cancelable) e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullYStart === null) return;
    
    if (pullOffset > 55) {
      triggerForceRefresh();
    } else {
      setPullOffset(0);
    }
    setPullYStart(null);
  };

  // Triggers workout dataset refresh
  const triggerForceRefresh = () => {
    setIsRefreshing(true);
    setPullOffset(60); // lock loader physically during fetch sequence
    
    setTimeout(() => {
      setIsRefreshing(false);
      setPullOffset(0);
      setRefreshMessage("Lavington athlete schedules synchronized successfully!");
      setTimeout(() => setRefreshMessage(null), 3000);
    }, 1200);
  };

  // Lightbox Touch event handlers (Pinch-to-zoom multi-touch trigger)
  const getDistance = (touch1: React.Touch, touch2: React.Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleLightboxTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // dual touch gesture initiated (Pinch Zoom)
      const dist = getDistance(e.touches[0], e.touches[1]);
      setInitialPinchDistance(dist);
      setInitialScale(zoomScale);
    } else if (e.touches.length === 1) {
      // single touch gesture initiated (Pan move)
      setIsPanning(true);
      setPanStart({
        x: e.touches[0].clientX - zoomPan.x,
        y: e.touches[0].clientY - zoomPan.y
      });
    }
  };

  const handleLightboxTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      if (e.cancelable) e.preventDefault();
      const dist = getDistance(e.touches[0], e.touches[1]);
      
      // Calculate linear pinch multiplier ratio
      const scaleRatio = dist / initialPinchDistance;
      const targetScale = Math.min(Math.max(initialScale * scaleRatio, 1.0), 4.0);
      setZoomScale(targetScale);
    } else if (e.touches.length === 1 && isPanning) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      setZoomPan({
        x: currentX - panStart.x,
        y: currentY - panStart.y
      });
    }
  };

  const handleLightboxTouchEnd = () => {
    setInitialPinchDistance(null);
    setIsPanning(false);
  };

  // Mouse Pan Mechanics for Desktop Users
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setPanStart({
      x: e.clientX - zoomPan.x,
      y: e.clientY - zoomPan.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setZoomPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Reset viewport states
  const resetZoomFactors = () => {
    setZoomScale(1);
    setZoomPan({ x: 0, y: 0 });
  };

  const handleOpenLightbox = (item: GalleryItem) => {
    setActiveZoomItem(item);
    resetZoomFactors();
  };

  // Compute final filtered array based on category choice, search text, and offline rule overrides
  const categories = ['All', 'HIIT', 'Strength', 'Yoga', 'Recovery', 'Open Gym'];
  
  const filteredWorkouts = GALLERY_ITEMS.filter((workout) => {
    const matchesCategory = selectedCategory === 'All' || workout.category === selectedCategory;
    const matchesSearch = 
      workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.coach.toLowerCase().includes(searchQuery.toLowerCase());
    
    // When offline, show ALL, but we will visually lock some in the presentation state 
    // to simulate offline access constraints dynamically.
    return matchesCategory && matchesSearch;
  });

  return (
    <div 
      ref={scrollRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="bg-white dark:bg-brand-black-deep text-gray-900 dark:text-brand-gray-light min-h-[85vh] transition-colors duration-200 overflow-y-auto"
    >
      
      {/* Pull pulley refresh visual indicator */}
      {pullOffset > 0 && (
        <div 
          className="flex flex-col items-center justify-center bg-gray-50 dark:bg-brand-black-card py-2 border-b border-gray-200 dark:border-brand-gray-border/20 transition-all text-xs font-semibold"
          style={{ height: `${pullOffset}px`, opacity: Math.min(pullOffset / 50, 1) }}
        >
          <div className="flex items-center gap-2 text-brand-orange">
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} style={{ transform: `rotate(${pullOffset * 4}deg)` }} />
            <span>{isRefreshing ? 'Syncing training program...' : 'Pull further to trigger sync'}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner notifying Simulated Offline restrictions */}
        {!isOnline && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-400 rounded-none text-xs sm:text-sm animate-offline flex flex-col sm:flex-row items-center gap-3 justify-center">
            <span className="flex items-center gap-2 font-black uppercase tracking-wider text-[11px]">
              <WifiOff className="w-5 h-5 flex-shrink-0 animate-bounce" />
              <span>OFFLINE ENHANCEMENT DEMO ACTIVE</span>
            </span>
            <span className="text-center sm:text-left font-light">
              Non-favorited exercises are simulated as cached placeholders. Your favorited items (marked with <Heart className="w-4.5 h-4.5 inline text-brand-orange fill-brand-orange" />) are immediately available in high resolution.
            </span>
          </div>
        )}

        {refreshMessage && (
          <div className="mb-6 p-3 bg-green-500/15 border border-green-500/35 text-green-800 dark:text-green-400 rounded-none text-xs font-semibold text-center animate-fade-in">
            {refreshMessage}
          </div>
        )}

        {/* Dynamic header summary */}
        <div className="mb-8 border-b border-gray-205 dark:border-brand-gray-border/20 pb-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-brand-orange font-sans font-bold text-[10px] tracking-[0.35em] uppercase block mb-1">
                Astra Performance Vault
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light text-gray-900 dark:text-white uppercase tracking-tight">
                High Performance <span className="font-serif italic font-semibold text-brand-orange">Gallery</span>
              </h2>
            </div>
            
            {/* Direct Refresh button for Desktop compatibility */}
            <button
              onClick={triggerForceRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-gray-100 dark:bg-brand-black-card hover:bg-gray-200 dark:hover:bg-brand-black-elevated text-[10px] font-sans font-bold px-4 py-2 bg-transparent border border-gray-300 dark:border-brand-gray-border/30 rounded-none tracking-[0.2em] uppercase transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Data'}</span>
            </button>
          </div>
        </div>

        {/* SEARCH AND RECENT SEARCHES PANEL */}
        <div className="bg-gray-50 dark:bg-brand-black-card p-4 rounded-none border border-gray-250 dark:border-brand-gray-border/20 mb-8 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-400 dark:text-brand-gray-muted w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              onBlur={() => triggerSearchSave(searchQuery)}
              placeholder="Search exercise movements, training styles, coaches..."
              className="w-full bg-white dark:bg-brand-black-deep text-xs text-gray-950 dark:text-white pl-10 pr-4 py-3.5 rounded-none border border-gray-300 dark:border-brand-gray-border/30 focus:border-brand-orange dark:focus:border-brand-orange outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-brand-gray-muted font-sans font-light"
            />
          </div>

          {/* Auto-saved search section if applicable */}
          {recentSearches.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-250 dark:border-brand-gray-border/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-500 dark:text-brand-gray-muted tracking-widest uppercase flex items-center gap-1.5 font-sans">
                  <History className="w-3.5 h-3.5 text-brand-orange" /> Recent Searches:
                </span>
                <button
                  onClick={clearAllSearchLogs}
                  className="text-[9px] text-gray-400 hover:text-brand-orange font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear History
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => setSearchQuery(rec.query)}
                    className="group inline-flex items-center gap-1 bg-white dark:bg-brand-black-deep hover:bg-brand-orange/15 border border-gray-200 dark:border-brand-gray-border/40 text-[11px] px-2.5 py-1 rounded-none text-gray-700 dark:text-brand-gray-light font-medium transition-colors cursor-pointer"
                  >
                    <span>{rec.query}</span>
                    <span 
                      onClick={(e) => clearSearchItem(rec.id, e)}
                      className="text-gray-400 group-hover:text-brand-orange p-0.5 rounded-none hover:bg-gray-100 dark:hover:bg-brand-black-card"
                    >
                      <X className="w-2.5 h-2.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CATEGORIES BUTTON FILTER */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans text-xs font-bold tracking-[0.25em] uppercase px-5 py-2.5 rounded-none transition-all flex-shrink-0 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-brand-orange text-brand-black-deep border-brand-orange font-black shadow-md shadow-brand-orange/10'
                  : 'bg-gray-150 dark:bg-brand-black-card text-gray-600 dark:text-brand-gray-light hover:bg-gray-200 dark:hover:bg-brand-black-elevated border-gray-250 dark:border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* EXERCISES GRID MAP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.length === 0 ? (
            <div className="col-span-full py-16 text-center text-gray-500">
              <span className="block text-sm font-semibold mb-2">No matching workout sessions found</span>
              <span className="text-xs">Try modifying your query tags or switching categories above.</span>
            </div>
          ) : (
            filteredWorkouts.map((workout) => {
              const isSaved = savedIds.includes(workout.id);
              const isBlurredOffline = !isOnline && !isSaved;

              return (
                <div
                  key={workout.id}
                  className={`bg-gray-50 dark:bg-brand-black-card rounded-none overflow-hidden border border-gray-200 dark:border-brand-gray-border/20 transition-all flex flex-col relative group h-full ${
                    isBlurredOffline 
                      ? 'shadow-inner' 
                      : 'hover:border-brand-orange shadow-sm'
                  }`}
                >
                  {/* Category Chip Left / Intensity Right */}
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <span className="bg-brand-black-deep/95 text-white text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-none border border-white/10">
                      {workout.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-20">
                    <button
                      onClick={() => toggleSave(workout.id)}
                      className={`p-2 rounded-none border shadow-md transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-brand-orange border-brand-orange text-brand-black-deep'
                          : 'bg-black/80 border-transparent text-white/60 hover:text-white'
                      }`}
                      title={isSaved ? "Favorited - Cached offline" : "Save for offline use"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-brand-black-deep' : ''}`} />
                    </button>
                  </div>

                  {/* Image Container with Optional Simulated Offline Blur states */}
                  <div className="h-56 relative overflow-hidden bg-brand-black-deep">
                    {isBlurredOffline ? (
                      <div className="absolute inset-0 bg-brand-black-deep/80 z-10 flex flex-col justify-center items-center text-center p-4">
                        <WifiOff className="w-8 h-8 text-amber-500 mb-2 animate-bounce" />
                        <span className="text-[10px] uppercase font-sans font-bold text-amber-400 tracking-[0.25em]">
                          Offline Locked
                        </span>
                        <p className="text-[10px] text-gray-400 max-w-xs mt-1.5 font-sans font-light">
                          Bookmark this item in Live mode to enable local persistent offline layout access!
                        </p>
                      </div>
                    ) : null}

                    <img
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        isBlurredOffline ? 'filter blur-md opacity-25' : 'brightness-95 dark:brightness-85'
                      }`}
                      src={workout.imageUrl}
                      alt={workout.title}
                      referrerPolicy="no-referrer"
                    />

                    {/* View overlay trigger */}
                    {!isBlurredOffline && (
                      <button
                        onClick={() => handleOpenLightbox(workout)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10"
                      >
                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-sans font-bold uppercase tracking-[0.25em] px-4 py-2 border border-white/20 rounded-none flex items-center gap-1.5 leading-none">
                          <ZoomIn className="w-3.5 h-3.5" /> Expand Details
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Body details */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className={`font-serif font-light text-base uppercase leading-tight tracking-tight ${
                          isBlurredOffline ? 'text-gray-400 dark:text-brand-gray-muted' : 'text-gray-900 group-hover:text-brand-orange dark:text-white transition-colors'
                        }`}>
                          {workout.title}
                        </h4>
                        <span className="text-[9px] font-sans font-bold uppercase bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-none border border-brand-orange/20 flex-shrink-0">
                          {workout.intensity}
                        </span>
                      </div>

                      <p className={`text-xs ${
                        isBlurredOffline ? 'text-gray-400/50 dark:text-brand-gray-muted/40' : 'text-gray-600 dark:text-brand-gray-light/70'
                      } line-clamp-3 mb-4 leading-relaxed font-sans font-light`}>
                        {isBlurredOffline 
                          ? "This high performance drill session contains structured recovery metrics, weight progressions, and coach comments. Access is blocked due to simulated low network connection."
                          : workout.description
                        }
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-brand-gray-border/20 flex justify-between items-center text-[11px] font-sans tracking-wide text-gray-500">
                      <span>Coach: <strong className="text-gray-800 dark:text-brand-gray-light font-bold">{workout.coach}</strong></span>
                      <span>Length: <strong className="text-gray-800 dark:text-brand-gray-light font-bold">{workout.duration}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* PINCH-TO-ZOOM / EXPAND DETAILS LIGHTBOX MODAL */}
      {activeZoomItem && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex flex-col justify-between animate-fade-in text-white select-none">
          {/* Lighbox header */}
          <div className="h-16 px-4 bg-black/60 backdrop-blur-sm border-b border-white/10 flex justify-between items-center relative z-20">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-brand-orange block mb-0.5">{activeZoomItem.category} • COACHED BY {activeZoomItem.coach}</span>
              <h3 className="font-serif font-light text-base uppercase text-white tracking-wide">{activeZoomItem.title}</h3>
            </div>
            
            <button
              onClick={() => setActiveZoomItem(null)}
              className="p-2 text-white hover:text-brand-orange transition-colors rounded-none bg-white/5 cursor-pointer border border-white/10"
              title="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Interactive Touch Zoom Canvas Container */}
          <div 
            className="flex-grow flex items-center justify-center relative overflow-hidden p-4 cursor-grab active:cursor-grabbing"
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Visual touch helper guidelines */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none md:hidden flex items-center gap-1.5 bg-black/60 backdrop-blur-sm py-1.5 px-3 text-[9px] text-gray-300 font-semibold uppercase tracking-wider rounded-none border border-white/10">
              <Fingerprint className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              <span>Use 2-finger pinch gesture to zoom</span>
            </div>

            {/* Simulated Live Zoom display badge */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none flex items-center gap-1.5 bg-black/60 backdrop-blur-sm py-1.5 px-3 text-[9px] font-mono text-brand-orange font-bold uppercase rounded-none border border-white/10">
              <span>Zoom Scale: {zoomScale.toFixed(1)}x</span>
            </div>

            <div 
              ref={imageContainerRef}
              className="max-w-full max-h-[60vh] transition-transform duration-100 ease-out origin-center select-none relative"
              style={{
                transform: `translate(${zoomPan.x}px, ${zoomPan.y}px) scale(${zoomScale})`
              }}
            >
              <img
                src={activeZoomItem.imageUrl}
                alt={activeZoomItem.title}
                className="max-w-full max-h-[55vh] object-contain select-none pointer-events-none shadow-2xl border border-white/10 rounded-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Gold video player streaming badges */}
              <div className="absolute top-4 left-4 pointer-events-none flex gap-2 z-30">
                <span className="flex items-center gap-1.5 bg-brand-orange text-brand-black-deep text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-none shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-black-deep animate-ping" />
                  Streaming Preview
                </span>
                <span className="bg-black/70 text-gray-300 text-[8px] font-mono tracking-wider px-1.5 py-0.5 rounded-none border border-white/10">
                  1080P HD
                </span>
              </div>

              {/* Gold dynamic play progress bar at the bottom of the image */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 overflow-hidden z-30">
                <div className="h-full bg-brand-orange animate-video-play-progress origin-left" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Lightbox details card & Zoom control slider */}
          <div className="bg-brand-black-card/95 backdrop-blur-md border-t border-white/10 p-6 relative z-20">
            {/* Range Slider for pinch zoom / mouse zooming compatibility */}
            <div className="max-w-xl mx-auto flex items-center gap-4 mb-6">
              <button 
                onClick={() => setZoomScale(Math.max(zoomScale - 0.5, 1.0))}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              
              <div className="flex-grow flex items-center gap-2">
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={zoomScale}
                  onChange={(e) => setZoomScale(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-none appearance-none cursor-pointer accent-brand-orange"
                />
              </div>

              <button 
                onClick={() => setZoomScale(Math.min(zoomScale + 0.5, 4.0))}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <button 
                onClick={resetZoomFactors}
                className="text-[9px] uppercase font-bold tracking-widest bg-white/10 px-3 py-1.5 rounded-none hover:bg-white/20 transition-all text-white border border-white/10 cursor-pointer"
              >
                Reset View
              </button>
            </div>

            {/* Coached Exercise Specs */}
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="md:col-span-2">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] block mb-2 font-sans">
                  Tactical Focus Description
                </span>
                <p className="text-gray-300 leading-relaxed font-serif font-light text-[15px]">
                  {activeZoomItem.description}
                </p>
              </div>

              <div className="bg-black/45 p-4 rounded-none border border-white/10 space-y-2 font-sans">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block border-b border-white/10 pb-1.5">
                  Lifting Specifications
                </span>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">Equipment:</span>
                  <span className="text-white text-right font-semibold">{activeZoomItem.equipment}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">Est. Timing:</span>
                  <span className="text-white text-right font-semibold">{activeZoomItem.duration}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">Load Level:</span>
                  <span className="text-brand-orange font-bold uppercase">{activeZoomItem.intensity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
