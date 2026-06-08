export interface GalleryItem {
  id: string;
  title: string;
  category: 'HIIT' | 'Strength' | 'Yoga' | 'Recovery' | 'Open Gym';
  imageUrl: string;
  intensity: 'Medium' | 'High' | 'Elite';
  coach: string;
  description: string;
  duration: string;
  equipment: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  avatarUrl: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  missingFeatures?: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface SearchRecord {
  id: string;
  query: string;
  timestamp: number;
}
